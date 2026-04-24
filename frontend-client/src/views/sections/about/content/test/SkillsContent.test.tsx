import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

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

beforeEach(() => {
  vi.clearAllMocks()
})

describe("SkillsContent", () => {

  it("should render loading state", () => {
    vi.spyOn(portfolioHook, "usePortfolio").mockReturnValue({
      loading: true,
      error: null,
      skills: [],
      profile: null,
      socialLinks: [],
      educations: [],
      projects: [],
    })

    renderWithProviders(<SkillsContent />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("should render grouped skills", () => {
    vi.spyOn(portfolioHook, "usePortfolio").mockReturnValue({
      loading: false,
      error: null,
      skills: [
        {
          id: "1",
          name: "React",
          category: "Frontend",
          icon: "react",
          level: "Advanced",
        },
        {
          id: "2",
          name: "Vue",
          category: "Frontend",
          icon: "vue",
          level: "Intermediate",
        },
        {
          id: "3",
          name: "Node.js",
          category: "Backend",
          icon: "node",
          level: "Advanced",
        },
      ],
      profile: null,
      socialLinks: [],
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

  it("should show all skills by default", () => {
    vi.spyOn(portfolioHook, "usePortfolio").mockReturnValue({
      loading: false,
      error: null,
      skills: [
        { id: "1", name: "React", category: "Frontend", icon: "react", level: "Advanced" },
        { id: "2", name: "Vue", category: "Frontend", icon: "vue", level: "Intermediate" },
      ],
      profile: null,
      socialLinks: [],
      educations: [],
      projects: [],
    })

    renderWithProviders(<SkillsContent />)

    expect(screen.getByText(/react/i)).toBeInTheDocument()
    expect(screen.getByText(/vue/i)).toBeInTheDocument()
  })

  it("should filter skills by Advanced level", async () => {
    const user = userEvent.setup()

    vi.spyOn(portfolioHook, "usePortfolio").mockReturnValue({
      loading: false,
      error: null,
      skills: [
        { id: "1", name: "React", category: "Frontend", icon: "react", level: "Advanced" },
        { id: "2", name: "Vue", category: "Frontend", icon: "vue", level: "Intermediate" },
      ],
      profile: null,
      socialLinks: [],
      educations: [],
      projects: [],
    })

    renderWithProviders(<SkillsContent />)

    const advancedButton = screen.getByRole("button", { name: /advanced/i })
    await user.click(advancedButton)

    expect(await screen.findByText(/react/i)).toBeInTheDocument()
    expect(screen.queryByText(/vue/i)).not.toBeInTheDocument()
  })

  it("should hide categories with no skills after filtering", async () => {
    const user = userEvent.setup()

    vi.spyOn(portfolioHook, "usePortfolio").mockReturnValue({
      loading: false,
      error: null,
      skills: [
        { id: "1", name: "React", category: "Frontend", icon: "react", level: "Advanced" },
        { id: "2", name: "Node.js", category: "Backend", icon: "node", level: "Basic" },
      ],
      profile: null,
      socialLinks: [],
      educations: [],
      projects: [],
    })

    renderWithProviders(<SkillsContent />)

    const advancedButton = screen.getByRole("button", { name: /advanced/i })
    await user.click(advancedButton)

    expect(await screen.findByText(/frontend/i)).toBeInTheDocument()
    expect(screen.queryByText(/backend/i)).not.toBeInTheDocument()
  })

  it("should mark selected filter button as active", async () => {
    const user = userEvent.setup()

    vi.spyOn(portfolioHook, "usePortfolio").mockReturnValue({
      loading: false,
      error: null,
      skills: [],
      profile: null,
      socialLinks: [],
      educations: [],
      projects: [],
    })

    renderWithProviders(<SkillsContent />)

    const advancedButton = screen.getByRole("button", { name: /advanced/i })
    await user.click(advancedButton)

    expect(advancedButton).toHaveClass("bg-red-500")
  })
})