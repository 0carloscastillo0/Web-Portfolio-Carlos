import { describe, it, expect, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { LanguageProvider, useLanguage } from "../LanguageContext"

/// Clear localStorage and reset document lang before each test
beforeEach(() => {
  localStorage.clear()
  document.documentElement.lang = ""
})

describe("LanguageContext", () => {

  it("should throw error if used outside provider", () => {
    expect(() => renderHook(() => useLanguage()))
      .toThrow("useLanguage must be used inside LanguageProvider")
  })

  it("should initialize language from localStorage", () => {
    localStorage.setItem("language", "ES")

    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.language).toBe("ES")
  })

  it("should update language", () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    result.current.setLanguage("EN")

    expect(result.current.language).toBe("EN")
  })

  it("should update document lang attribute", () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })
    act(() => {
        result.current.setLanguage("ES")
    })

    expect(document.documentElement.lang).toBe("es")
  })

})