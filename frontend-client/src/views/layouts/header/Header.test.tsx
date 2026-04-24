import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react"

import Header from "./Header"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { PortfolioProvider } from "@/contexts/PortfolioContext"
import { translations } from "@/i18n"

/**
 * Render helper
 * --------------------------------------------------
 * Encapsulates all required providers for the Header.
 * This avoids repetition across tests and ensures
 * a consistent test environment.
 */
const renderHeader = () => {
    beforeEach(() => {
        localStorage.setItem("language", "ES")
    })

    return render(
        <ThemeProvider>
            <LanguageProvider>
                <PortfolioProvider>
                    <Header />
                </PortfolioProvider>
            </LanguageProvider>
        </ThemeProvider>
    )
}

describe("Header", () => {

    /**
     * UI Rendering
     * --------------------------------------------------
     * Validates that the application title is rendered.
     *
     * Note:
     * The title exists twice (desktop + mobile),
     * so we use `getAllByRole` instead of `getByText`.
     */
    it("should render application title", () => {
        renderHeader()

        const titles = screen.getAllByRole("heading", {
            name: /castillo sites/i,
        })

        expect(titles.length).toBeGreaterThan(0)
    })

    /**
     * Mobile Menu Behavior
     * --------------------------------------------------
     * Verifies that the mobile menu toggles correctly.
     *
     * Instead of checking visibility, we assert the
     * transform classes applied to the menu.
     */
    it("should toggle mobile menu", () => {
        renderHeader()

        const button = screen.getByRole("button", { name: /toggle menu/i })
        const menu = screen.getByTestId("mobile-menu")

        // estado inicial (cerrado)
        expect(menu).toHaveClass("translate-x-full")

        fireEvent.click(button)

        // estado después del click (abierto)
        expect(menu).not.toHaveClass("translate-x-full")
    })

    /**
     * Language Switching
     * --------------------------------------------------
     * Simulates changing the language from the mobile menu.
     *
     * Flow:
     * 1. Open mobile menu
     * 2. Open language submenu
     * 3. Select a different language
     * 4. Assert UI update
     *
     * Important:
     * We scope assertions inside the mobile menu using `within`
     * to avoid conflicts with duplicated elements (desktop/mobile).
     */
    it("should change language from mobile menu", async () => {
        renderHeader()

        // Step 1: Open mobile menu
        fireEvent.click(screen.getByLabelText(/toggle menu/i))

        // Step 2: Open language submenu
        fireEvent.click(screen.getByLabelText(/open language menu/i))

        // Step 3: Select language (EN option showing ES label)
        fireEvent.click(screen.getByText(translations.EN.language.ES))

        // Step 4: Validate UI update
        await waitFor(() => {
            const mobileMenu = screen.getByTestId("mobile-menu")

            expect(
                within(mobileMenu).getByRole("button", { name: /inicio/i })
            ).toBeInTheDocument()
        })
    })

    /**
     * Theme Switching
     * --------------------------------------------------
     * Verifies that selecting a theme updates the root HTML class.
     *
     * In this case:
     * - Selecting "Light" should remove the `dark` class.
     */
    it("should change theme from mobile menu", () => {
        renderHeader()

        // Open mobile menu
        fireEvent.click(screen.getByLabelText(/toggle menu/i))

        // Open theme submenu
        fireEvent.click(screen.getByLabelText(/open theme menu/i))

        // Select Light theme
        fireEvent.click(screen.getByText(translations.ES.theme.Light))

        // Assert dark mode disabled
        expect(document.documentElement.classList.contains("dark")).toBe(false)
    })

    /**
     * CV Download Link (Global)
     * --------------------------------------------------
     * Ensures that all CV links:
     * - Exist
     * - Have correct attributes
     */
    it("should render CV download link with correct attributes", async () => {
        renderHeader()

        const links = await screen.findAllByRole("link", {
            name: new RegExp(translations.ES.header.downloadCV, "i"),
        })

        expect(links.length).toBeGreaterThan(0)

        links.forEach((link) => {
            expect(link).toHaveAttribute("href", "/user/CV_Carlos_Castillo.pdf")
            expect(link).toHaveAttribute("download")
        })
    })

    /**
     * CV Link - Desktop
     * --------------------------------------------------
     * Validates that the CV link is present in the desktop header.
     */
    it("should render CV download link in desktop", async () => {
        renderHeader()

        const header = screen.getByRole("banner")

        const link = await within(header).findByRole("link", {
            name: new RegExp(translations.ES.header.downloadCV, "i"),
        })

        expect(link).toBeInTheDocument()
    })

    /**
     * CV Link - Mobile
     * --------------------------------------------------
     * Validates that the CV link is present inside the mobile menu.
     */
    it("should render CV link in mobile menu", async () => {
        renderHeader()

        // Open mobile menu
        fireEvent.click(screen.getByLabelText(/toggle menu/i))

        const mobileMenu = screen.getByTestId("mobile-menu")

        const link = await within(mobileMenu).findByRole("link", {
            name: new RegExp(translations.ES.header.downloadCV, "i"),
        })

        expect(link).toBeInTheDocument()
    })

    /**
     * Mobile UX Behavior
     * --------------------------------------------------
     * Ensures that clicking the CV link closes the mobile menu.
     */
    it("should close mobile menu when clicking CV download link", async () => {
        renderHeader()

        // Open mobile menu
        fireEvent.click(screen.getByLabelText(/toggle menu/i))

        const mobileMenu = screen.getByTestId("mobile-menu")

        const link = await within(mobileMenu).findByRole("link", {
            name: new RegExp(translations.ES.header.downloadCV, "i"),
        })

        // Click CV link
        fireEvent.click(link)

        // Assert menu closed
        expect(mobileMenu).toHaveClass("translate-x-full")
    })

    /**
     * Section Scrolling
     * --------------------------------------------------
     * Validates that clicking a nav item scrolls to the correct section.
     */
    it("should scroll to section", () => {
        const scrollToMock = vi.fn()
        window.scrollTo = scrollToMock

        document.getElementById = vi.fn().mockReturnValue({
            offsetTop: 200,
        } as unknown as HTMLElement)

        renderHeader()

        const nav = screen.getAllByRole("button", {
            name: new RegExp(translations.ES.nav.home, "i"),
        })[0]

        fireEvent.click(nav)

        expect(scrollToMock).toHaveBeenCalled()
    })

    /**
     * Home Section Behavior
     * --------------------------------------------------
     * Ensures that clicking the "Home" nav item scrolls to the top.
     */
    it("should scroll to top when section is home", () => {
        const scrollToMock = vi.fn()
        window.scrollTo = scrollToMock

        document.getElementById = vi.fn().mockReturnValue({
            offsetTop: 200,
        } as unknown as HTMLElement)

        renderHeader()

        const homeBtn = screen.getAllByRole("button", {
            name: new RegExp(translations.ES.nav.home, "i"),
        })[0]

        fireEvent.click(homeBtn)

        expect(scrollToMock).toHaveBeenCalledWith(
            expect.objectContaining({ top: 0 })
        )
    })

    /**
     * Active Section Update on Scroll
     * --------------------------------------------------
     * Validates that the active section updates based on scroll position.
     */
    it("should update active section on scroll", () => {
        const sections = {
            home: 0,
            about: 150,
            projects: 300,
            contact: 450,
        }

        // Mock getElementById to return elements with specific offsetTop values
        vi.spyOn(document, "getElementById").mockImplementation((id: string) => {
            const el = document.createElement("div")

            Object.defineProperty(el, "offsetTop", {
                value: sections[id as keyof typeof sections] ?? 0,
            })

            return el
        })

        renderHeader()

        // Simulate scrolling to 110px (between home and about)
        window.scrollY = 110
        fireEvent.scroll(window)

        const nav = screen.getByRole("navigation")
        // The "About" button should be active (have text-accent class)
        const aboutBtn = within(nav).getByRole("button", {
            name: new RegExp(translations.ES.nav.about, "i"),
        })

        expect(aboutBtn).toHaveClass("text-accent")
    })
})