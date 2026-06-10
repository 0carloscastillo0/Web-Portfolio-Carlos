import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { createSkill } from "../../../../tests/helpers/db.helper";

const updatePayload = { name: "Node.js", category: "Runtime", icon: "node-icon" };

describe("PUT /api/v1/users/:userId/skills/:skillId", () => {
  it("updates skill for owner", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const skill = await createSkill(user.id);
    const response = await api().put(`/api/v1/users/${user.id}/skills/${skill.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(200);
    expect(response.body.data.name).toBe(updatePayload.name);
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();
    const skill = await createSkill(user.id);
    await api().put(`/api/v1/users/${user.id}/skills/${skill.id}`).send(updatePayload).expect(401);
  });

  it("returns 403 for non-owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();
    const skill = await createSkill(other.user.id);
    await api().put(`/api/v1/users/${other.user.id}/skills/${skill.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(403);
  });

  it("returns 404 for nonexistent skill", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    await api().put(`/api/v1/users/${user.id}/skills/9999`).set("Authorization", authHeader(accessToken)).send(updatePayload).expect(404);
  });
});
