import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { imageFixturePath, textFixturePath } from "../../../../tests/helpers/file.helper";
import { createProject, prisma } from "../../../../tests/helpers/db.helper";

describe("POST /api/v1/users/:userId/projects/:projectId/images", () => {
  it("uploads project images for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const project = await createProject(user.id);

    const response = await api()
      .post(`/api/v1/users/${user.id}/projects/${project.id}/images`)
      .set("Authorization", authHeader(accessToken))
      .attach("images", imageFixturePath)
      .attach("images", imageFixturePath)
      .expect(201);

    expect(response.body.data).toHaveLength(2);
    expect(await prisma.imgProject.findMany({ where: { projectId: project.id } })).toHaveLength(2);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const project = await createProject(user.id);
    await api().post(`/api/v1/users/${user.id}/projects/${project.id}/images`).attach("images", imageFixturePath).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const project = await createProject(other.user.id);
    await api().post(`/api/v1/users/${other.user.id}/projects/${project.id}/images`).set("Authorization", authHeader(accessToken)).attach("images", imageFixturePath).expect(403);
  });

  it("returns 400 for non-image file", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const project = await createProject(user.id);
    await api().post(`/api/v1/users/${user.id}/projects/${project.id}/images`).set("Authorization", authHeader(accessToken)).attach("images", textFixturePath).expect(400);
  });
});
