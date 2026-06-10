import { describe, expect, it, vi, beforeEach } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createProject, createSkill, prisma } from "../../../../tests/helpers/db.helper";

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

describe("DELETE /api/v1/users/:userId/projects/:projectId", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deletes project, skill relations, image records and calls deleteCloudinaryFile", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const skill = await createSkill(user.id);
    const project = await createProject(user.id);
    await prisma.skillProject.create({ data: { skillId: skill.id, projectId: project.id } });

    await prisma.imgProject.create({ data: { url: "https://res.cloudinary.com/test/image.png", filename: "portfolio/projects/old-img", size: 5, mimeType: "image/png", projectId: project.id, order: 0 } });

    await api().delete(`/api/v1/users/${user.id}/projects/${project.id}`).set("Authorization", authHeader(accessToken)).expect(200);

    expect(await prisma.project.findUnique({ where: { id: project.id } })).toBeNull();
    expect(await prisma.skillProject.findMany({ where: { projectId: project.id } })).toHaveLength(0);
    expect(await prisma.imgProject.findMany({ where: { projectId: project.id } })).toHaveLength(0);

    const { deleteCloudinaryFile } = await import("../../../../src/utils/cloudinary");
    expect(deleteCloudinaryFile).toHaveBeenCalledWith("portfolio/projects/old-img", "image");
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
