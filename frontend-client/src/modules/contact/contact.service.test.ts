import { describe, it, expect } from "vitest"
import { getContacts } from "./contact.service"
import { fallbackContacts } from "./contact.fallback"

describe("contact.service", () => {
  it("should return all contacts", async () => {
    const contacts = await getContacts()

    expect(contacts).toBeDefined()
    expect(Array.isArray(contacts)).toBe(true)
    expect(contacts).toEqual(fallbackContacts)
  })
})