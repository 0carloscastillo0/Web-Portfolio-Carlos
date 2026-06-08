import { describe, expect, it } from "vitest";
import { api } from "../../../../tests/helpers/request.helper";
import { authHeader, createAuthenticatedUser } from "../../../../tests/helpers/auth.helper";
import { prisma } from "../../../../tests/helpers/db.helper";

const updatePayload = (overrides: any = {}) => ({
  name: overrides.name ?? "Updated",
  lastname: overrides.lastname ?? "User",
  email: overrides.email ?? "updated@email.com",
  title: overrides.title ?? "Senior Developer",
  city: overrides.city ?? "Valparaiso",
  country: overrides.country ?? "Chile",
  description: overrides.description ?? "Updated description",
});

describe("PUT /api/v1/users/:id", () => {
  it("updates portfolio user data for owner without touching sensitive or upload fields", async () => {
    const { user, accessToken } = await createAuthenticatedUser({ urlCV: "/uploads/cv/old.pdf", urlPhoto: "/uploads/users/old.png" });
    const originalPassword = user.password;

    const response = await api()
      .put(`/api/v1/users/${user.id}`)
      .set("Authorization", authHeader(accessToken))
      .send(updatePayload())
      .expect(200);

    expect(response.body.data.name).toBe("Updated");

    const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(updatedUser?.password).toBe(originalPassword);
    expect(updatedUser?.urlCV).toBe("/uploads/cv/old.pdf");
    expect(updatedUser?.urlPhoto).toBe("/uploads/users/old.png");
  });

  it("returns 401 without token", async () => {
    const { user } = await createAuthenticatedUser();

    await api().put(`/api/v1/users/${user.id}`).send(updatePayload()).expect(401);
  });

  it("returns 403 when authenticated user is not owner", async () => {
    const { accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();

    await api().put(`/api/v1/users/${other.user.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload()).expect(403);
  });

  it("returns 400 when body is invalid", async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    await api().put(`/api/v1/users/${user.id}`).set("Authorization", authHeader(accessToken)).send({ email: "invalid" }).expect(400);
  });

  it("returns 409 when email is already in use", async () => {
    const { user, accessToken } = await createAuthenticatedUser();
    const other = await createAuthenticatedUser();

    await api().put(`/api/v1/users/${user.id}`).set("Authorization", authHeader(accessToken)).send(updatePayload({ email: other.user.email })).expect(409);
  });
});
