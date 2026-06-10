import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { prisma } from "../../../../tests/helpers/db.helper";

describe("PATCH /api/v1/auth/change-password", () => {
  it("changes password and invalidates refresh token", async () => {
    const { user, accessToken, refreshToken, password } = await createAuthenticatedUser();
    const newPassword = "NewPassword123";

    await api()
      .patch("/api/v1/auth/change-password")
      .set("Authorization", authHeader(accessToken))
      .send({ currentPassword: password, newPassword })
      .expect(200);

    await api().post("/api/v1/auth/refresh-token").send({ refreshToken }).expect(401);
    await api().post("/api/v1/auth/login").send({ email: user.email, password }).expect(401);
    await api().post("/api/v1/auth/login").send({ email: user.email, password: newPassword }).expect(200);

    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(updatedUser?.refreshTokenHash).toBeTruthy();
  });

  it("returns 401 with invalid current password", async () => {
    const { accessToken } = await createAuthenticatedUser();

    await api()
      .patch("/api/v1/auth/change-password")
      .set("Authorization", authHeader(accessToken))
      .send({ currentPassword: "WrongPassword", newPassword: "NewPassword123" })
      .expect(401);
  });

  it("returns 401 without token", async () => {
    await api().patch("/api/v1/auth/change-password").send({ currentPassword: "Password123", newPassword: "NewPassword123" }).expect(401);
  });

  it("returns 400 with invalid body", async () => {
    const { accessToken } = await createAuthenticatedUser();

    await api().patch("/api/v1/auth/change-password").set("Authorization", authHeader(accessToken)).send({}).expect(400);
  });
});
