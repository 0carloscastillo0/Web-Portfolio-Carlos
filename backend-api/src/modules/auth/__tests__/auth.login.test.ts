import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { createUser, uniqueEmail } from "../../../../tests/helpers/db.helper";

describe("POST /api/v1/auth/login", () => {
  it("logs in with valid credentials and returns tokens without sensitive fields", async () => {
    const password = "Password123";
    const user = await createUser({ password });

    const response = await api().post("/api/v1/auth/login").send({ email: user.email, password }).expect(200);

    expect(response.body.data.accessToken).toBeTruthy();
    expect(response.body.data.refreshToken).toBeTruthy();
    expect(response.body.data.user.password).toBeUndefined();
    expect(response.body.data.user.refreshTokenHash).toBeUndefined();
  });

  it("returns 401 for wrong password", async () => {
    const user = await createUser({ password: "Password123" });

    await api().post("/api/v1/auth/login").send({ email: user.email, password: "WrongPassword" }).expect(401);
  });

  it("returns 401 for nonexistent email", async () => {
    await api().post("/api/v1/auth/login").send({ email: uniqueEmail(), password: "Password123" }).expect(401);
  });

  it("returns 400 when body is invalid", async () => {
    await api().post("/api/v1/auth/login").send({ email: "invalid" }).expect(400);
  });
});
