import { describe, it, expect } from "vitest"
import { getUserSkills } from "./skill.service"
import { fallbackSkills } from "./skill.fallback"

describe("skill.service", () => {
  it("should return user skills", async () => {
    const skills = await getUserSkills()

    expect(skills).toBeDefined()
    expect(Array.isArray(skills)).toBe(true)
    expect(skills).toEqual(fallbackSkills)
  })
})