import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";

const payload = { name: "GitHub", icon: "github-icon", url: "https://github.com/test" };

describe("POST /api/v1/users/:userId/social-links", () => {
  it("creates social link for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const response = await api().post(`/api/v1/users/${user.id}/social-links`).set("Authorization", authHeader(accessToken)).send(payload).expect(201);
    expect(response.body.data.name).toBe(payload.name);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${user.id}/social-links`).send(payload).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${other.user.id}/social-links`).set("Authorization", authHeader(accessToken)).send(payload).expect(403);
  });

  it("returns 400 for invalid body", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${user.id}/social-links`).set("Authorization", authHeader(accessToken)).send({}).expect(400);
  });
});
