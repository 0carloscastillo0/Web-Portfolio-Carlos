import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import SkillsContent from "../SkillsContent"

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
 * ================= SKILLS TEST =================
*/
describe("SkillsContent", () => {

    it("should render loading state", () => {
      vi.spyOn(portfolioHook, "usePortfolio").mockReturnValueOnce({
        loading: true,
        error: null,
        skills: [],
        profile: null,
        contacts: [],
        educations: [],
        projects: [],
      })

      renderWithProviders(<SkillsContent />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    it("should render grouped skills", () => {
      vi.spyOn(portfolioHook, "usePortfolio").mockReturnValueOnce({
        loading: false,
        error: null,
        skills: [
          {
            id: "1",
            name: "React",
            category: "Frontend",
            icon: "react",
          },
          {
            id: "2",
            name: "Vue",
            category: "Frontend",
            icon: "vue",
          },
          {
            id: "3",
            name: "Node.js",
            category: "Backend",
            icon: "node",
          },
        ],
        profile: null,
        contacts: [],
        educations: [],
        projects: [],
      })

      renderWithProviders(<SkillsContent />)

      // Categories
      expect(screen.getByText(/frontend/i)).toBeInTheDocument()
      expect(screen.getByText(/backend/i)).toBeInTheDocument()

      // Skills
      expect(screen.getByText(/react/i)).toBeInTheDocument()
      expect(screen.getByText(/vue/i)).toBeInTheDocument()
      expect(screen.getByText(/node\.js/i)).toBeInTheDocument()
    })
})