import { describe, it, expect } from "vitest"
import { getEducations } from "./education.service"
import { fallbackEducations } from "./education.fallback"

describe("education.service", () => {
  it("should return all educations", async () => {
    const educations = await getEducations()

    expect(educations).toBeDefined()
    expect(Array.isArray(educations)).toBe(true)
    expect(educations).toEqual(fallbackEducations)
  })
})