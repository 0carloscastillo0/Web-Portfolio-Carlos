import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createProject, createSkill, prisma } from "../../../../tests/helpers/db.helper";

const updatePayload = (skillIds: number[] = []) => ({ title: "Updated Project", startDate: "2024-02-01T00:00:00.000Z", endDate: null, description: "Updated description", skillIds });

describe("PUT /api/v1/users/:userId/projects/:projectId", () => {
  it("updates project and skill relations for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const oldSkill = await createSkill(user.id, { name: "Old" });
    const newSkill = await createSkill(user.id, { name: "New" });
    const project = await createProject(user.id);
    await prisma.skillProject.create({ data: { skillId: oldSkill.id, projectId: project.id } });

    const response = await api().put(`/api/v1/users/${user.id}/projects/${project.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload([newSkill.id])).expect(200);

    expect(response.body.data.title).toBe("Updated Project");
    const relations = await prisma.skillProject.findMany({ where: { projectId: project.id } });
    expect(relations).toHaveLength(1);
    expect(relations[0].skillId).toBe(newSkill.id);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const project = await createProject(user.id);
    await api().put(`/api/v1/users/${user.id}/projects/${project.id}`).send(updatePayload()).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const project = await createProject(other.user.id);
    await api().put(`/api/v1/users/${other.user.id}/projects/${project.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload()).expect(403);
  });

  it("returns 400 when skill belongs to another user", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const otherSkill = await createSkill(other.user.id);
    const project = await createProject(user.id);
    await api().put(`/api/v1/users/${user.id}/projects/${project.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload([otherSkill.id])).expect(400);
  });
});
