import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createSocialLink, prisma } from "../../../../tests/helpers/db.helper";

describe("DELETE /api/v1/users/:userId/social-links/:socialLinkId", () => {
  it("deletes social link for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const link = await createSocialLink(user.id);
    await api().delete(`/api/v1/users/${user.id}/social-links/${link.id}`).set("Authorization", authHeader(accessToken)).expect(200);
    expect(await prisma.socialLink.findUnique({ where: { id: link.id } })).toBeNull();
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const link = await createSocialLink(user.id);
    await api().delete(`/api/v1/users/${user.id}/social-links/${link.id}`).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const link = await createSocialLink(other.user.id);
    await api().delete(`/api/v1/users/${other.user.id}/social-links/${link.id}`).set("Authorization", authHeader(accessToken)).expect(403);
  });
});
