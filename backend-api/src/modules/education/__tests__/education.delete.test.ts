import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createEducation, prisma } from "../../../../tests/helpers/db.helper";

describe("DELETE /api/v1/users/:userId/educations/:educationId", () => {
  it("deletes education for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const education = await createEducation(user.id);
    await api().delete(`/api/v1/users/${user.id}/educations/${education.id}`).set("Authorization", authHeader(accessToken)).expect(200);
    expect(await prisma.education.findUnique({ where: { id: education.id } })).toBeNull();
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const education = await createEducation(user.id);
    await api().delete(`/api/v1/users/${user.id}/educations/${education.id}`).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const education = await createEducation(other.user.id);
    await api().delete(`/api/v1/users/${other.user.id}/educations/${education.id}`).set("Authorization", authHeader(accessToken)).expect(403);
  });
});
