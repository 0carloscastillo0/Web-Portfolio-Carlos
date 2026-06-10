import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createSocialLink, createUser } from "../../../../tests/helpers/db.helper";

describe("GET /api/v1/users/:userId/social-links", () => {
  it("returns social links without auth", async () => {
    const user = await createUser();
    await createSocialLink(user.id);
    const response = await api().get(`/api/v1/users/${user.id}/social-links`).expect(200);
    expect(response.body.data).toHaveLength(1);
  });

  it("returns 404 for nonexistent user", async () => {
    await api().get("/api/v1/users/9999/social-links").expect(404);
  });
});
