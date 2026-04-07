import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import EducationContent from "../EducationContent"

import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import * as portfolioHook from "@/hooks/usePortfolio"

/**
 * Helper to wrap providers
 */
const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    </ThemeProvider>
  )
}

/**
 * ================= EDUCATION TEST =================
 */
describe("EducationContent", () => {

    it("should render loading state", () => {
      vi.spyOn(portfolioHook, "usePortfolio").mockReturnValueOnce({
        loading: true,
        error: null,
        educations: [],
        profile: null,
        contacts: [],
        skills: [],
        projects: [],
      })

      renderWithProviders(<EducationContent />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    it("should render education list", () => {
      vi.spyOn(portfolioHook, "usePortfolio").mockReturnValueOnce({
        loading: false,
        error: null,
        educations: [
          {
            id: "1",
            place: "University X",
            name: "Computer Science",
            description: "Software Engineering",
            startDate: "2020-01-01",
            endDate: "2024-01-01",
          },
        ],
        profile: null,
        contacts: [],
        skills: [],
        projects: [],
      })

      renderWithProviders(<EducationContent />)

      expect(screen.getAllByText(/university x/i)).toHaveLength(2)
      expect(screen.getAllByText(/computer science/i)).toHaveLength(2)
      expect(screen.getAllByText(/software engineering/i)).toHaveLength(2)
    })
})
