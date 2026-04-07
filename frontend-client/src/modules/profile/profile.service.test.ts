import { describe, it, expect } from "vitest"
import { getProfile } from "./profile.service"
import { fallbackProfile } from "./profile.fallback"

describe("profile.service", () => {
  it("should return user profile", async () => {
    const profile = await getProfile()

    expect(profile).toBeDefined()
    expect(profile).toEqual(fallbackProfile)
  })
})