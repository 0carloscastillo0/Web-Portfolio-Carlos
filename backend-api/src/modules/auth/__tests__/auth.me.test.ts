import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";

describe("GET /api/v1/auth/me", () => {
  it("returns authenticated user without sensitive fields", async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    const response = await api().get("/api/v1/auth/me").set("Authorization", authHeader(accessToken)).expect(200);

    expect(response.body.data.id).toBe(user.id);
    expect(response.body.data.password).toBeUndefined();
    expect(response.body.data.refreshTokenHash).toBeUndefined();
  });

  it("returns 401 without token", async () => {
    await api().get("/api/v1/auth/me").expect(401);
  });

  it("returns 401 with invalid token", async () => {
    await api().get("/api/v1/auth/me").set("Authorization", "Bearer invalid-token").expect(401);
  });
});
