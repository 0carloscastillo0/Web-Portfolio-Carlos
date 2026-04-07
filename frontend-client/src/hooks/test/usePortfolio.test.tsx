import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { usePortfolio } from "../usePortfolio"
import { PortfolioContext } from "@/contexts/PortfolioContext"

describe("usePortfolio", () => {

  it("should return default context values when no provider is used", () => {
    const { result } = renderHook(() => usePortfolio())

    expect(result.current).toEqual({
      profile: null,
      contacts: [],
      skills: [],
      educations: [],
      projects: [],
      loading: true,
      error: null
    })
  })

  it("should return provided context values", () => {

    const mockContext = {
      profile: null,
      contacts: [],
      skills: [],
      educations: [],
      projects: [],
      loading: false,
      error: null
    }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PortfolioContext.Provider value={mockContext}>
        {children}
      </PortfolioContext.Provider>
    )

    const { result } = renderHook(() => usePortfolio(), { wrapper })

    expect(result.current).toEqual(mockContext)
  })

})