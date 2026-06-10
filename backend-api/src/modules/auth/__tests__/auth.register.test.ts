import { describe, expect, it } from "vitest";
import bcrypt from "bcrypt";
import { api } from "../../../../tests/helpers/request.helper";
import { registerPayload } from "../../../../tests/helpers/auth.helper";
import { prisma } from "../../../../tests/helpers/db.helper";

describe("POST /api/v1/auth/register", () => {
  it("registers a user with hashed password and no sensitive fields in response", async () => {
    const payload = registerPayload();

    const response = await api().post("/api/v1/auth/register").send(payload).expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(payload.email);
    expect(response.body.data.password).toBeUndefined();
    expect(response.body.data.refreshTokenHash).toBeUndefined();

    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    expect(user?.password).toBeTruthy();
    expect(user?.password).not.toBe(payload.password);
    expect(await bcrypt.compare(payload.password, user!.password!)).toBe(true);
  });

  it("returns 409 when email is duplicated", async () => {
    const payload = registerPayload();
    await api().post("/api/v1/auth/register").send(payload).expect(201);

    const response = await api().post("/api/v1/auth/register").send(payload).expect(409);

    expect(response.body.success).toBe(false);
  });

  it("returns 400 when body is invalid", async () => {
    const response = await api().post("/api/v1/auth/register").send({ email: "invalid" }).expect(400);

    expect(response.body.success).toBe(false);
  });
});
