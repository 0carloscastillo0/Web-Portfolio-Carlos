import { describe, expect, it, vi, beforeEach } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { imageFixturePath, pdfFixturePath } from "../../../../tests/helpers/file.helper";
import { prisma } from "../../../../tests/helpers/db.helper";

vi.mock("../../../../src/utils/cloudinary", () => ({
  uploadImage: vi.fn().mockResolvedValue({
    secure_url: "https://res.cloudinary.com/test/image/upload/portfolio/users/test-photo.png",
    public_id: "portfolio/users/test-photo",
  }),
  uploadPdf: vi.fn().mockResolvedValue({
    secure_url: "https://res.cloudinary.com/test/raw/upload/portfolio/cv/test-cv.pdf",
    public_id: "portfolio/cv/test-cv",
  }),
  deleteCloudinaryFile: vi.fn().mockResolvedValue({ result: "ok" }),
}));

describe("POST /api/v1/users/:id/cv", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uploads user CV for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    const response = await api()
      .post(`/api/v1/users/${user.id}/cv`)
      .set("Authorization", authHeader(accessToken))
      .attach("cv", pdfFixturePath)
      .expect(201);

    expect(response.body.data.urlCV).toContain("cloudinary.com");
    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(updatedUser?.urlCV).toBe(response.body.data.urlCV);
    expect(updatedUser?.cvPublicId).toBeTruthy();
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();

    await api().post(`/api/v1/users/${user.id}/cv`).attach("cv", pdfFixturePath).expect(401);
  });

  it("returns 403 when authenticated user is not owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();

    await api().post(`/api/v1/users/${other.user.id}/cv`).set("Authorization", authHeader(accessToken)).attach("cv", pdfFixturePath).expect(403);
  });

  it("returns 400 with non-pdf file", async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    await api().post(`/api/v1/users/${user.id}/cv`).set("Authorization", authHeader(accessToken)).attach("cv", imageFixturePath).expect(400);
  });

  it("replaces previous CV and calls deleteCloudinaryFile", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    await prisma.user.update({ where: { id: user.id }, data: { urlCV: "https://res.cloudinary.com/test/old.pdf", cvPublicId: "portfolio/cv/old-cv" } });

    await api().post(`/api/v1/users/${user.id}/cv`).set("Authorization", authHeader(accessToken)).attach("cv", pdfFixturePath).expect(201);

    const { deleteCloudinaryFile } = await import("../../../../src/utils/cloudinary");
    expect(deleteCloudinaryFile).toHaveBeenCalledWith("portfolio/cv/old-cv", "raw");
  });
});
