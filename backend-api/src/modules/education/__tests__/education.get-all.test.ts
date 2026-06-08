import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createEducation, createUser } from "../../../../tests/helpers/db.helper";

describe("GET /api/v1/users/:userId/educations", () => {
  it("returns educations without auth", async () => {
    const user = await createUser();
    await createEducation(user.id);
    const response = await api().get(`/api/v1/users/${user.id}/educations`).expect(200);
    expect(response.body.data).toHaveLength(1);
  });

  it("returns 404 for nonexistent user", async () => {
    await api().get("/api/v1/users/9999/educations").expect(404);
  });
});
