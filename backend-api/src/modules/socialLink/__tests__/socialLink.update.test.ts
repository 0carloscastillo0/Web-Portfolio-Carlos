import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createSocialLink } from "../../../../tests/helpers/db.helper";

const updatePayload = { name: "LinkedIn", icon: "linkedin-icon", url: "https://linkedin.com/in/test" };

describe("PUT /api/v1/users/:userId/social-links/:socialLinkId", () => {
  it("updates social link for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const link = await createSocialLink(user.id);
    const response = await api().put(`/api/v1/users/${user.id}/social-links/${link.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(200);
    expect(response.body.data.name).toBe(updatePayload.name);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const link = await createSocialLink(user.id);
    await api().put(`/api/v1/users/${user.id}/social-links/${link.id}`).send(updatePayload).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const link = await createSocialLink(other.user.id);
    await api().put(`/api/v1/users/${other.user.id}/social-links/${link.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(403);
  });

  it("returns 404 for nonexistent social link", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    await api().put(`/api/v1/users/${user.id}/social-links/9999`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(404);
  });
});
