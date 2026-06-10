import { api } from "./request.helper";
import { createUser, uniqueEmail } from "./db.helper";

export const registerPayload = (overrides: any = {}) => ({
  name: overrides.name ?? "Test",
  lastname: overrides.lastname ?? "User",
  email: overrides.email ?? uniqueEmail(),
  password: overrides.password ?? "Password123",
  title: overrides.title ?? "Developer",
  city: overrides.city ?? "Santiago",
  country: overrides.country ?? "Chile",
  description: overrides.description ?? "Test user description",
});

export const registerUser = async (overrides: any = {}) => {
  const payload = registerPayload(overrides);
  const response = await api().post("/api/v1/auth/register").send(payload);
  return { payload, response, user: response.body.data };
};

export const loginUser = async (email: string, password = "Password123") => {
  const response = await api().post("/api/v1/auth/login").send({ email, password });
  return {
    response,
    accessToken: response.body.data?.accessToken,
    refreshToken: response.body.data?.refreshToken,
    user: response.body.data?.user,
  };
};

export const createAuthenticatedUser = async (overrides: any = {}) => {
  const password = overrides.password ?? "Password123";
  const user = await createUser({ ...overrides, password });
  const login = await loginUser(user.email, password);
  return {
    user,
    password,
    accessToken: login.accessToken,
    refreshToken: login.refreshToken,
  };
};

export const authHeader = (accessToken: string) => `Bearer ${accessToken}`;
