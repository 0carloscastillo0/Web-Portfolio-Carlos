import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import Home from "./Home"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import * as portfolioHook from "@/hooks/usePortfolio"

/**
 * Mock for usePortfolio hook (default: loaded state)
 */
vi.spyOn(portfolioHook, "usePortfolio").mockReturnValue({
    loading: false,
    error: null,
    profile: {
        id: "1",
        name: "Carlos",
        lastname: "Castillo",
        email: "carlos.cast@gmail.com",
        description: "this is my description",
        title: "Frontend Developer",
        country: "Chile",
        city: "Santiago",
        Urlphoto: "/test.jpg",
        UrlCVES: "/testES.pdf",
        UrlCVEN: "/testEN.pdf",
    },
    socialLinks: [
        {
            id: "1",
            name: "GitHub",
            url: "https://github.com/test",
            icon: "github",
        },
        {
            id: "2",
            name: "LinkedIn",
            url: "https://linkedin.com/test",
            icon: "linkedin",
        },
    ],
    skills: [],
    educations: [],
    projects: [],
})

/**
 * Helper to render Home with required providers
 */
const renderHome = () => {
    return render(
        <ThemeProvider>
        <LanguageProvider>
            <Home />
        </LanguageProvider>
        </ThemeProvider>
    )
}

describe("Home Section", () => {

    /**
     * Should render loading state when data is being fetched
     */
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

        renderHome()

        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    /**
     * Should render profile name and title
     */
    it("should render profile info", () => {
        renderHome()

        expect(
        screen.getByText((content) =>
            content.toLowerCase().includes("carlos") &&
            content.toLowerCase().includes("castillo")
        )
        ).toBeInTheDocument()

        expect(
        screen.getByText(/frontend developer/i)
        ).toBeInTheDocument()
    })

    /**
     * Should render user location (country and city)
     */
    it("should render location", () => {
        renderHome()

        expect(
        screen.getByText(/chile, santiago/i)
        ).toBeInTheDocument()
    })

    /**
     * Should render social/contact links with correct URLs
     */
    it("should render contact links", () => {
        renderHome()

        const githubLink = screen.getByRole("link", { name: /github/i })
        const linkedinLink = screen.getByRole("link", { name: /linkedin/i })

        expect(githubLink).toHaveAttribute("href", "https://github.com/test")
        expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/test")
    })

    /**
     * Should render profile image with correct src and alt text
     */
    it("should render profile image", () => {
        renderHome()

        const image = screen.getByRole("img", { name: /carlos/i })

        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute("src", "/test.jpg")
    })
})