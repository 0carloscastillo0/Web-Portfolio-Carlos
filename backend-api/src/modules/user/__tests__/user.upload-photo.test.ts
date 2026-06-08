import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { imageFixturePath, textFixturePath } from "../../../../tests/helpers/file.helper";
import { prisma } from "../../../../tests/helpers/db.helper";

describe("POST /api/v1/users/:id/photo", () => {
  it("uploads user photo for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    const response = await api()
      .post(`/api/v1/users/${user.id}/photo`)
      .set("Authorization", authHeader(accessToken))
      .attach("image", imageFixturePath)
      .expect(201);

    expect(response.body.data.urlPhoto).toContain("/uploads/users/");
    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(updatedUser?.urlPhoto).toBe(response.body.data.urlPhoto);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();

    await api().post(`/api/v1/users/${user.id}/photo`).attach("image", imageFixturePath).expect(401);
  });

  it("returns 403 when authenticated user is not owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();

    await api().post(`/api/v1/users/${other.user.id}/photo`).set("Authorization", authHeader(accessToken)).attach("image", imageFixturePath).expect(403);
  });

  it("returns 400 with non-image file", async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    await api().post(`/api/v1/users/${user.id}/photo`).set("Authorization", authHeader(accessToken)).attach("image", textFixturePath).expect(400);
  });

  it("replaces previous image file", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const oldFile = "old-photo.png";
    const oldPath = path.resolve("uploads/users", oldFile);
    fs.mkdirSync(path.dirname(oldPath), { recursive: true });
    fs.writeFileSync(oldPath, "old");
    await prisma.user.update({ where: { id: user.id }, data: { urlPhoto: `/uploads/users/${oldFile}` } });

    await api().post(`/api/v1/users/${user.id}/photo`).set("Authorization", authHeader(accessToken)).attach("image", imageFixturePath).expect(201);

    expect(fs.existsSync(oldPath)).toBe(false);
  });
});
