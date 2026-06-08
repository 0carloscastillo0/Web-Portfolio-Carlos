import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createSkill } from "../../../../tests/helpers/db.helper";

const payload = (skillIds: number[] = []) => ({
  title: "Portfolio API",
  startDate: "2024-01-01T00:00:00.000Z",
  endDate: null,
  description: "Project description",
  skillIds,
});

describe("POST /api/v1/users/:userId/projects", () => {
  it("creates project for owner with skills", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const skill = await createSkill(user.id);

    const response = await api().post(`/api/v1/users/${user.id}/projects`).set("Authorization", authHeader(accessToken)).send(payload([skill.id])).expect(201);

    expect(response.body.data.title).toBe("Portfolio API");
    expect(response.body.data.skills).toHaveLength(1);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${user.id}/projects`).send(payload()).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    await api().post(`/api/v1/users/${other.user.id}/projects`).set("Authorization", authHeader(accessToken)).send(payload()).expect(403);
  });

  it("returns 400 when skill belongs to another user", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const otherSkill = await createSkill(other.user.id);

    await api().post(`/api/v1/users/${user.id}/projects`).set("Authorization", authHeader(accessToken)).send(payload([otherSkill.id])).expect(400);
  });
});
