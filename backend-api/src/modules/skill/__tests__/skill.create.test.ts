import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";

const payload = { name: "TypeScript", category: "Language", icon: "ts-icon" };

describe("POST /api/v1/users/:userId/skills", () => {
  it("creates skill for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const response = await api().post(`/api/v1/users/${user.id}/skills`).set("Authorization", authHeader(accessToken)).send(payload).expect(201);
    expect(response.body.data.name).toBe(payload.name);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${user.id}/skills`).send(payload).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${other.user.id}/skills`).set("Authorization", authHeader(accessToken)).send(payload).expect(403);
  });

  it("returns 400 for invalid body", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${user.id}/skills`).set("Authorization", authHeader(accessToken)).send({}).expect(400);
  });
});
