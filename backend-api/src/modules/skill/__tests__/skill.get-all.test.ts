import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createSkill, createUser } from "../../../../tests/helpers/db.helper";

describe("GET /api/v1/users/:userId/skills", () => {
  it("returns skills without auth", async () => {
    const user = await createUser();
    await createSkill(user.id);
    const response = await api().get(`/api/v1/users/${user.id}/skills`).expect(200);
    expect(response.body.data).toHaveLength(1);
  });

  it("returns 404 for nonexistent user", async () => {
    await api().get("/api/v1/users/9999/skills").expect(404);
  });
});
