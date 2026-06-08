import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createEducation } from "../../../../tests/helpers/db.helper";

const updatePayload = { place: "Updated University", name: "Software Engineering", startDate: "2021-01-01T00:00:00.000Z", endDate: null, description: "Updated" };

describe("PUT /api/v1/users/:userId/educations/:educationId", () => {
  it("updates education for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const education = await createEducation(user.id);
    const response = await api().put(`/api/v1/users/${user.id}/educations/${education.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(200);
    expect(response.body.data.place).toBe(updatePayload.place);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const education = await createEducation(user.id);
    await api().put(`/api/v1/users/${user.id}/educations/${education.id}`).send(updatePayload).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const education = await createEducation(other.user.id);
    await api().put(`/api/v1/users/${other.user.id}/educations/${education.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(403);
  });

  it("returns 404 for nonexistent education", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    await api().put(`/api/v1/users/${user.id}/educations/9999`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(404);
  });
});
