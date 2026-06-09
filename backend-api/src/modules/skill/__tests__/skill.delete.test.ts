import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createProject, createSkill, prisma } from "../../../../tests/helpers/db.helper";

describe("DELETE /api/v1/users/:userId/skills/:skillId", () => {
  it("deletes skill for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const skill = await createSkill(user.id);
    await api().delete(`/api/v1/users/${user.id}/skills/${skill.id}`).set("Authorization", authHeader(accessToken)).expect(200);
    expect(await prisma.skill.findUnique({ where: { id: skill.id } })).toBeNull();
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const skill = await createSkill(user.id);
    await api().delete(`/api/v1/users/${user.id}/skills/${skill.id}`).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const skill = await createSkill(other.user.id);
    await api().delete(`/api/v1/users/${other.user.id}/skills/${skill.id}`).set("Authorization", authHeader(accessToken)).expect(403);
  });

  it("deletes skill even when associated to a project", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const skill = await createSkill(user.id);
    const project = await createProject(user.id);
    await prisma.skillProject.create({ data: { skillId: skill.id, projectId: project.id } });

    await api().delete(`/api/v1/users/${user.id}/skills/${skill.id}`).set("Authorization", authHeader(accessToken)).expect(200);
    expect(await prisma.skill.findUnique({ where: { id: skill.id } })).toBeNull();
    expect(await prisma.skillProject.findMany({ where: { skillId: skill.id } })).toHaveLength(0);
  });
});
