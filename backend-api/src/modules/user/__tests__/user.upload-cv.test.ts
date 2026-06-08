import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { imageFixturePath, pdfFixturePath } from "../../../../tests/helpers/file.helper";
import { prisma } from "../../../../tests/helpers/db.helper";

describe("POST /api/v1/users/:id/cv", () => {
  it("uploads user CV for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    const response = await api()
      .post(`/api/v1/users/${user.id}/cv`)
      .set("Authorization", authHeader(accessToken))
      .attach("cv", pdfFixturePath)
      .expect(201);

    expect(response.body.data.urlCV).toContain("/uploads/cv/");
    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(updatedUser?.urlCV).toBe(response.body.data.urlCV);
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

  it("replaces previous CV file", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const oldFile = "old-cv.pdf";
    const oldPath = path.resolve("uploads/cv", oldFile);
    fs.mkdirSync(path.dirname(oldPath), { recursive: true });
    fs.writeFileSync(oldPath, "old");
    await prisma.user.update({ where: { id: user.id }, data: { urlCV: `/uploads/cv/${oldFile}` } });

    await api().post(`/api/v1/users/${user.id}/cv`).set("Authorization", authHeader(accessToken)).attach("cv", pdfFixturePath).expect(201);

    expect(fs.existsSync(oldPath)).toBe(false);
  });
});
