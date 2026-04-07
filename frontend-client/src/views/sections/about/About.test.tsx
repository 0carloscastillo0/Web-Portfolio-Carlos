import { describe, it, expect } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import About from "./About"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { translations } from "@/i18n"

/**
 * Helper to render About component with required providers
 */
const renderAbout = () => {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <About />
      </LanguageProvider>
    </ThemeProvider>
  )
}

describe("About Section", () => {

  /**
   * Should render the main section title and subtitle
   */
  it("should render title and subtitle", () => {
    renderAbout()

    // Title (use role → accessibility best practice)
    expect(
      screen.getByRole("heading", { name: /about/i })
    ).toBeInTheDocument()

    // Subtitle (explicit text from translations for stability)
    expect(
      screen.getByText(translations.EN.about.subtitle)
    ).toBeInTheDocument()
  })

  /**
   * Should render all interactive cards (Description, Skills, Education)
   */
  it("should render all about cards", () => {
    renderAbout()

    expect(
      screen.getByRole("button", { name: /description/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /skills/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole("button", { name: /education/i })
    ).toBeInTheDocument()
  })

  /**
   * Should open the Description modal when clicking its card
   */
  it("should open description modal", () => {
    renderAbout()

    const descriptionCard = screen.getByRole("button", { name: /description/i })
    fireEvent.click(descriptionCard)

    // Validate modal content appears (flexible matcher)
    expect(
      screen.getByText((content) =>
        content.toLowerCase().includes("description")
      )
    ).toBeInTheDocument()
  })

  /**
   * Should open the Skills modal when clicking its card
   */
  it("should open skills modal", async () => {
    renderAbout()

    const skillsCard = screen.getByRole("button", { name: /skills/i })
    fireEvent.click(skillsCard)

    // Wait for modal (dialog) to appear
    const dialog = await screen.findByRole("dialog")

    expect(dialog).toBeInTheDocument()
  })

  /**
   * Should open the Education modal when clicking its card
   */
  it("should open education modal", () => {
    renderAbout()

    const educationCard = screen.getByRole("button", { name: /education/i })
    fireEvent.click(educationCard)

    expect(
      screen.getByText((content) =>
        content.toLowerCase().includes("education")
      )
    ).toBeInTheDocument()
  })

  /**
   * Should close the modal when clicking the close button
   */
  it("should close modal", async () => {
    renderAbout()

    // Open modal
    fireEvent.click(screen.getByRole("button", { name: /description/i }))

    // Close modal (accessible name required in Modal component)
    const closeButton = screen.getByRole("button", { name: /close/i })
    fireEvent.click(closeButton)

    // Wait for modal to be removed from DOM
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })
})