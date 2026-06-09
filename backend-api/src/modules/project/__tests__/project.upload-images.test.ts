import { describe, expect, it, vi, beforeEach } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { imageFixturePath, textFixturePath } from "../../../../tests/helpers/file.helper";
import { createProject, prisma } from "../../../../tests/helpers/db.helper";

vi.mock("../../../../src/utils/cloudinary", () => ({
  uploadImage: vi.fn().mockResolvedValue({
    secure_url: "https://res.cloudinary.com/test/image/upload/portfolio/projects/test.png",
    public_id: "portfolio/projects/test",
  }),
  uploadPdf: vi.fn().mockResolvedValue({
    secure_url: "https://res.cloudinary.com/test/raw/upload/portfolio/cv/test.pdf",
    public_id: "portfolio/cv/test",
  }),
  deleteCloudinaryFile: vi.fn().mockResolvedValue({ result: "ok" }),
}));

describe("POST /api/v1/users/:userId/projects/:projectId/images", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    expect(response.body.data[0].url).toContain("cloudinary.com");
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
