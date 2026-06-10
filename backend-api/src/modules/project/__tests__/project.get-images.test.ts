import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createProject, createUser, prisma } from "../../../../tests/helpers/db.helper";

describe("GET /api/v1/users/:userId/projects/:projectId/images", () => {
  it("returns project images ordered by order without auth", async () => {
    const user = await createUser();
    const project = await createProject(user.id);
    await prisma.imgProject.create({ data: { url: "/uploads/projects/b.png", filename: "b.png", size: 1, mimeType: "image/png", projectId: project.id, order: 1 } });
    await prisma.imgProject.create({ data: { url: "/uploads/projects/a.png", filename: "a.png", size: 1, mimeType: "image/png", projectId: project.id, order: 0 } });

    const response = await api().get(`/api/v1/users/${user.id}/projects/${project.id}/images`).expect(200);

    expect(response.body.data).toHaveLength(2);
    expect(response.body.data[0].filename).toBe("a.png");
  });

  it("returns 404 for nonexistent project", async () => {
    const user = await createUser();
    await api().get(`/api/v1/users/${user.id}/projects/9999/images`).expect(404);
  });
});
