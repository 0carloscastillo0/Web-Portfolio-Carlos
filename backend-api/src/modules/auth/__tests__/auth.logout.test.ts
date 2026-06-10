import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { prisma } from "../../../../tests/helpers/db.helper";

describe("POST /api/v1/auth/logout", () => {
  it("logs out and clears refreshTokenHash", async () => {
    const { user, refreshToken } = await createAuthenticatedUser();

    await api().post("/api/v1/auth/logout").send({ refreshToken }).expect(200);

    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(updatedUser?.refreshTokenHash).toBeNull();
  });

  it("returns 401 with invalid refresh token", async () => {
    await api().post("/api/v1/auth/logout").send({ refreshToken: "invalid-token" }).expect(401);
  });

  it("returns 400 without refresh token", async () => {
    await api().post("/api/v1/auth/logout").send({}).expect(400);
  });
});
