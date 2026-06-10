import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createProject, createSkill, createUser, prisma } from "../../../../tests/helpers/db.helper";

describe("GET /api/v1/users/:userId/projects", () => {
  it("returns projects without auth with normalized skills", async () => {
    const user = await createUser();
    const skill = await createSkill(user.id);
    const project = await createProject(user.id);
    await prisma.skillProject.create({ data: { skillId: skill.id, projectId: project.id } });

    const response = await api().get(`/api/v1/users/${user.id}/projects`).expect(200);

    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].skills[0].id).toBe(skill.id);
  });

  it("returns 404 for nonexistent user", async () => {
    await api().get("/api/v1/users/9999/projects").expect(404);
  });
});
