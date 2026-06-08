import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";

describe("POST /api/v1/auth/refresh-token", () => {
  it("returns a new access token with a valid refresh token", async () => {
    const { refreshToken } = await createAuthenticatedUser();

    const response = await api().post("/api/v1/auth/refresh-token").send({ refreshToken }).expect(200);

    expect(response.body.data.accessToken).toBeTruthy();
  });

  it("returns 401 with invalid refresh token", async () => {
    await api().post("/api/v1/auth/refresh-token").send({ refreshToken: "invalid-token" }).expect(401);
  });

  it("returns 400 without refresh token", async () => {
    await api().post("/api/v1/auth/refresh-token").send({}).expect(400);
  });

  it("returns 401 after logout invalidates refresh token", async () => {
    const { refreshToken } = await createAuthenticatedUser();
    await api().post("/api/v1/auth/logout").send({ refreshToken }).expect(200);

    await api().post("/api/v1/auth/refresh-token").send({ refreshToken }).expect(401);
  });
});
