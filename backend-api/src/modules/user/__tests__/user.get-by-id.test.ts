import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createUser } from "../../../../tests/helpers/db.helper";

describe("GET /api/v1/users/:id", () => {
  it("returns public user data without requiring auth", async () => {
    const user = await createUser();

    const response = await api().get(`/api/v1/users/${user.id}`).expect(200);

    expect(response.body.data.id).toBe(user.id);
    expect(response.body.data.password).toBeUndefined();
    expect(response.body.data.refreshTokenHash).toBeUndefined();
  });

  it("returns 404 when user does not exist", async () => {
    await api().get("/api/v1/users/9999").expect(404);
  });

  it("returns 400 when id is invalid", async () => {
    await api().get("/api/v1/users/invalid").expect(400);
  });
});
