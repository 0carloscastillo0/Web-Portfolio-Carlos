import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import DescriptionContent from "../DescriptionContent"

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
 * ================= DESCRIPTION TEST =================
 */
describe("DescriptionContent", () => {

    it("should render loading state", () => {
      vi.spyOn(portfolioHook, "usePortfolio").mockReturnValueOnce({
        loading: true,
        error: null,
        profile: null,
        socialLinks: [],
        skills: [],
        educations: [],
        projects: [],
      })

      renderWithProviders(<DescriptionContent />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    it("should render profile description and image", () => {
      vi.spyOn(portfolioHook, "usePortfolio").mockReturnValueOnce({
        loading: false,
        error: null,
        profile: {
          id: "1",
          name: "Carlos",
          lastname: "Castillo",
          title: "Software Engineer",
          email: "carlos.cast@gmail.com",
          country: "Spain",
          city: "Madrid",
          description: "This is my description",
          Urlphoto: "/test.jpg",
          UrlCVES: "/cvEs.pdf",
          UrlCVEN: "/cvEn.pdf",
        },
        socialLinks: [],
        skills: [],
        educations: [],
        projects: [],
      })

      renderWithProviders(<DescriptionContent />)

      expect(screen.getByText(/this is my description/i)).toBeInTheDocument()

      const image = screen.getByRole("img", { name: /carlos/i })
      expect(image).toHaveAttribute("src", "/test.jpg")
    })
})
 