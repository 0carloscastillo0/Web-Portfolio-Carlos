import { useState, useRef, useEffect } from "react"

import { useTheme } from "@/contexts/ThemeContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "@/hooks/useTranslation"
import { usePortfolio } from "@/hooks/usePortfolio"
import { translations } from "@/i18n/index"
import type { Language } from "@/i18n/index"
import DownloadCVModal from "@/views/components/DownloadCVModal"

import DesktopHeader from "./components/DesktopHeader"
import MobileHeader from "./components/MobileHeader"
import MobileMenu from "./components/MobileMenu"

function Header() {

    /* =====================================================
        TYPES & CONSTANTS
    ===================================================== */
    const { profile } = usePortfolio()
    const sections = [
        { id: "home", label: "nav.home" },
        { id: "about", label: "nav.about" },
        { id: "projects", label: "nav.projects" },
        { id: "contact", label: "nav.contact" },
    ]

    const languages = Object.keys(translations) as Language[]

    const themes = ["Dark", "Light"] as const
    type Theme = typeof themes[number]

    type MobileView = "menu" | "language" | "theme"

    const { language, setLanguage } = useLanguage()
    const { t } = useTranslation()

    const { theme, setTheme } = useTheme()

    const currentLangRef = useRef(language)
    const isScrollingProgrammatically = useRef(false)

    /* =====================================================
        STATE
    ===================================================== */

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileView, setMobileView] = useState<MobileView>("menu")

    const [activeSection, setActiveSection] = useState("home")

    const [isCVModalOpen, setIsCVModalOpen] = useState(false)

    /* =====================================================
        REFS
    ===================================================== */

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (isScrollingProgrammatically.current) return

            const scrollPosition = window.scrollY + 100 // header offset

            let currentSection = "home"

            for (const section of sections) {
                const element = document.getElementById(section.id)

                if (element) {
                    const offsetTop = element.offsetTop

                    if (scrollPosition >= offsetTop) {
                        currentSection = section.id
                    }
                }
            }

            setActiveSection(currentSection)
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Lock/unlock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [mobileMenuOpen])

    // Keep current language reference in sync
    useEffect(() => {
        currentLangRef.current = language
    }, [language])

    /* =====================================================
        HANDLERS
    ===================================================== */
    // Change theme and close dropdown
    const changeTheme = (selected: Theme) => {
        setTheme(selected)
    }

    // Change language and close dropdown
    const changeLanguage = (selected: Language ) => {
        setLanguage(selected)
    }

    // Smooth scroll to section and update active state
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)

        if (element) {
            const headerOffset = 20
            const offsetPosition = (id === "home") ? 0 : (element.offsetTop - headerOffset)

            isScrollingProgrammatically.current = true
            setActiveSection(id)

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            })

            setTimeout(() => {
                isScrollingProgrammatically.current = false
            }, 700)
        }

        setMobileMenuOpen(false)
    }

    /* =====================================================
        RENDER
    ===================================================== */
    return (
        <>
            <header className="sticky top-0 z-50 w-full backdrop-blur border-b border-soft surface-primary">

                {/* ================= CONTAINER ================= */}
                <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between">

                    {/* =====================================================
                        DESKTOP LAYOUT
                    ===================================================== */}
                    <DesktopHeader
                        sections={sections}
                        activeSection={activeSection}
                        onNavigate={scrollToSection}
                        language={language}
                        languages={languages}
                        onChangeLanguage={changeLanguage}
                        theme={theme}
                        themes={themes}
                        onChangeTheme={changeTheme}
                        t={t}
                        cvUrlES={profile?.UrlCVES}
                        cvUrlEN={profile?.UrlCVEN}
                        onOpenCVModal={() => setIsCVModalOpen(true)}
                    />

                    {/* =====================================================
                        MOBILE HEADER BAR
                    ===================================================== */}
                    <MobileHeader
                        mobileMenuOpen={mobileMenuOpen}
                        onToggleMenu={() => setMobileMenuOpen(prev => !prev)}
                    />
                </div>

                
            </header>

            {/* =====================================================
                MOBILE DROPDOWN MENU
            ===================================================== */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                sections={sections}
                activeSection={activeSection}
                onNavigate={scrollToSection}
                mobileView={mobileView}
                setMobileView={setMobileView}
                language={language}
                languages={languages}
                onChangeLanguage={changeLanguage}
                theme={theme}
                themes={themes}
                onChangeTheme={changeTheme}
                t={t}
                cvUrlES={profile?.UrlCVES}
                cvUrlEN={profile?.UrlCVEN}
                onOpenCVModal={() => setIsCVModalOpen(true)}
            />
            
            {/* =====================================================
                DOWNLOAD CV MODAL
            ===================================================== */}
            {isCVModalOpen && (
                <DownloadCVModal
                    onClose={() => setIsCVModalOpen(false)}
                    urlES={profile?.UrlCVES}
                    urlEN={profile?.UrlCVEN}
                    t={t}
                />
            )}
        </>
    )
}

export default Header