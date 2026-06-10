import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";

const payload = { place: "University", name: "Computer Science", startDate: "2020-01-01T00:00:00.000Z", endDate: null, description: "Degree" };

describe("POST /api/v1/users/:userId/educations", () => {
  it("creates education for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const response = await api().post(`/api/v1/users/${user.id}/educations`).set("Authorization", authHeader(accessToken)).send(payload).expect(201);
    expect(response.body.data.place).toBe(payload.place);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${user.id}/educations`).send(payload).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${other.user.id}/educations`).set("Authorization", authHeader(accessToken)).send(payload).expect(403);
  });

  it("returns 400 for invalid body", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${user.id}/educations`).set("Authorization", authHeader(accessToken)).send({}).expect(400);
  });
});
