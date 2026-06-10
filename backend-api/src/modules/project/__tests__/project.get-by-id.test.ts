import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createProject, createUser } from "../../../../tests/helpers/db.helper";

describe("GET /api/v1/users/:userId/projects/:projectId", () => {
  it("returns project without auth", async () => {
    const user = await createUser();
    const project = await createProject(user.id);

    const response = await api().get(`/api/v1/users/${user.id}/projects/${project.id}`).expect(200);

    expect(response.body.data.id).toBe(project.id);
  });

  it("returns 404 for nonexistent project", async () => {
    const user = await createUser();
    await api().get(`/api/v1/users/${user.id}/projects/9999`).expect(404);
  });

  it("returns 404 when project does not belong to user", async () => {
    const user = await createUser();
    const other = await createUser();
    const project = await createProject(other.id);
    await api().get(`/api/v1/users/${user.id}/projects/${project.id}`).expect(404);
  });
});
