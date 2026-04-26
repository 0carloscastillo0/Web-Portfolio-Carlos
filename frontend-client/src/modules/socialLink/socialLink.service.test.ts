import { describe, it, expect } from "vitest"
import { getSocialLinks } from "./socialLink.service"
import { fallbackSocialLink } from "./socialLink.fallback"

describe("socialLink.service", () => {
  it("should return all social links", async () => {
    const socialLinks = await getSocialLinks()

    expect(socialLinks).toBeDefined()
    expect(Array.isArray(socialLinks)).toBe(true)
    expect(socialLinks).toEqual(fallbackSocialLink)
  })
})