import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createProject, createSkill, prisma } from "../../../../tests/helpers/db.helper";

describe("DELETE /api/v1/users/:userId/projects/:projectId", () => {
  it("deletes project, skill relations, image records and image files", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const skill = await createSkill(user.id);
    const project = await createProject(user.id);
    await prisma.skillProject.create({ data: { skillId: skill.id, projectId: project.id } });

    const filename = "project-image.png";
    const imagePath = path.resolve("uploads/projects", filename);
    fs.mkdirSync(path.dirname(imagePath), { recursive: true });
    fs.writeFileSync(imagePath, "image");
    await prisma.imgProject.create({ data: { url: `/uploads/projects/${filename}`, filename, size: 5, mimeType: "image/png", projectId: project.id, order: 0 } });

    await api().delete(`/api/v1/users/${user.id}/projects/${project.id}`).set("Authorization", authHeader(accessToken)).expect(200);

    expect(await prisma.project.findUnique({ where: { id: project.id } })).toBeNull();
    expect(await prisma.skillProject.findMany({ where: { projectId: project.id } })).toHaveLength(0);
    expect(await prisma.imgProject.findMany({ where: { projectId: project.id } })).toHaveLength(0);
    expect(fs.existsSync(imagePath)).toBe(false);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const project = await createProject(user.id);
    await api().delete(`/api/v1/users/${user.id}/projects/${project.id}`).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const project = await createProject(other.user.id);
    await api().delete(`/api/v1/users/${other.user.id}/projects/${project.id}`).set("Authorization", authHeader(accessToken)).expect(403);
  });
});
