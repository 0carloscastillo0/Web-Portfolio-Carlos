import { describe, it, expect } from "vitest"
import { render, screen, fireEvent, within } from "@testing-library/react"

import Header from "./Header"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { translations } from "@/i18n"

/**
 * Helper function to render the Header component
 * wrapped with required context providers.
 */
const renderHeader = () => {
    return render(
        <ThemeProvider>
        <LanguageProvider>
            <Header />
        </LanguageProvider>
        </ThemeProvider>
    )
}

describe("Header", () => {

    /**
     * Ensure the application title is rendered.
     * Note: There are two titles (desktop + mobile),
     * so we use getAllByRole instead of getByText.
     */
    it("should render title", () => {
        renderHeader()

        const titles = screen.getAllByRole("heading", {
            name: /castillo sites/i,
        })

        expect(titles.length).toBeGreaterThan(0)
    })

    /**
     * Verify mobile menu toggles correctly.
     * Instead of checking visibility, we validate
     * the transform classes applied to the menu.
     */
    it("should toggle mobile menu", () => {
        renderHeader()

        const toggleBtn = screen.getByLabelText(/toggle menu/i)
        const mobileMenu = document.querySelector(".fixed")

        // Open menu
        fireEvent.click(toggleBtn)
        expect(mobileMenu).toHaveClass("translate-x-0")

        // Close menu
        fireEvent.click(toggleBtn)
        expect(mobileMenu).toHaveClass("translate-x-full")
    })

    /**
     * Verify language change using the mobile menu.
     * We scope queries using `within` to avoid conflicts
     * with duplicated elements (desktop + mobile).
     */
    it("should change language from mobile menu", () => {
        renderHeader()

        // Open mobile menu
        const toggleButton = screen.getByLabelText(/toggle menu/i)
        fireEvent.click(toggleButton)

        // Open language submenu
        const languageEntry = screen.getByLabelText(/open language menu/i)
        fireEvent.click(languageEntry)

        // Scope search inside the language menu container
        const menu = screen
        .getByRole("button", { name: /language/i })
        .closest("div")

        if (!menu) throw new Error("Language menu not found")

        const { getByText } = within(menu)

        // Select English option
        const languageOption = getByText(translations.EN.language.ES)
        fireEvent.click(languageOption)

        // Validate UI updated (translated button appears)
        expect(
            screen.getAllByText(translations.ES.header.downloadCV).length
        ).toBeGreaterThan(0)
    })

    /**
     * Verify theme change using the mobile menu.
     * We assert the change via the root HTML class.
     */
    it("should change theme from mobile menu", () => {
        renderHeader()

        // Open mobile menu
        const toggleButton = screen.getByLabelText(/toggle menu/i)
        fireEvent.click(toggleButton)

        // Open theme submenu
        const themeEntry = screen.getByLabelText(/open theme menu/i)
        fireEvent.click(themeEntry)

        // Select light theme
        const themeOption = screen.getByText(translations.ES.theme.Light)
        fireEvent.click(themeOption)

        // Validate theme change (dark class removed)
        expect(document.documentElement.classList.contains("dark")).toBe(false)
    })
})