import { describe, it, expect, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { ThemeProvider, useTheme } from "../ThemeContext"

/// Clear localStorage and reset document class before each test
beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ""
})

describe("ThemeContext", () => {

  it("should throw error if used outside provider", () => {
    expect(() => renderHook(() => useTheme()))
      .toThrow("useTheme must be used within ThemeProvider")
  })

  it("should initialize theme from localStorage", () => {
    localStorage.setItem("theme", "Light")

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe("Light")
  })

  it("should update theme", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
        result.current.setTheme("Light")
    })

    expect(result.current.theme).toBe("Light")
  })

  it("should toggle dark class on document", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })
    
    result.current.setTheme("Dark")

    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })

})