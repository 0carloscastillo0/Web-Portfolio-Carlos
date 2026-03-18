import { useState, useRef, useEffect } from "react"
import {
    Globe,
    Sun,
    Moon,
    ChevronDown,
    Menu,
    X,
    ChevronRight,
    ChevronLeft
} from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
import { useTranslation } from "../hooks/useTranslation"
import { translations } from "../i18n/index"
import type { Language } from "../i18n/index"

function Header() {

    /* =====================================================
        TYPES & CONSTANTS
    ===================================================== */
    const sections = [
        { id: "home", label: "nav.home" },
        { id: "about", label: "nav.about" },
        { id: "projects", label: "nav.projects" }
    ]

    const languages = Object.keys(translations) as Language[]

    const themes = ["Dark", "Light"] as const
    type Theme = typeof themes[number]

    type MobileView = "menu" | "language" | "theme"

    const { language, setLanguage } = useLanguage()
    const { t } = useTranslation()

    const currentLangRef = useRef(language)
    const isScrollingProgrammatically = useRef(false)

    /* =====================================================
        STATE
    ===================================================== */
    const { theme, setTheme } = useTheme()

    const [openLang, setOpenLang] = useState(false)
    const [openTheme, setOpenTheme] = useState(false)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileView, setMobileView] = useState<MobileView>("menu")

    const [activeSection, setActiveSection] = useState("home")

    /* =====================================================
        REFS
    ===================================================== */
    const langRef = useRef<HTMLDivElement>(null)
    const themeRef = useRef<HTMLDivElement>(null)

    /* =====================================================
        EFFECTS
    ===================================================== */
    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setOpenLang(false)
            }
            if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
                setOpenTheme(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

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
        setOpenTheme(false)
    }

    // Change language and close dropdown
    const changeLanguage = (selected: Language) => {
        setLanguage(selected)
        setOpenLang(false)
    }

    // Smooth scroll to section and update active state
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)

        if (element) {
            const headerOffset = 20
            let offsetPosition = 0

            if (id === "home") {
                offsetPosition = 0
            } else {
                offsetPosition = element.offsetTop - headerOffset
            }

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
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* =====================================================
                        DESKTOP LAYOUT
                    ===================================================== */}
                    <div className="hidden md:flex w-full items-center justify-between">

                        {/* -------- LEFT: SITE TITLE -------- */}
                        <h1 className="text-xl font-bold text-accent">
                            Castillo Sites
                        </h1>

                        {/* -------- RIGHT SIDE -------- */}
                        <div className="flex items-center space-x-8">

                            {/* ===== NAVIGATION MENU ===== */}
                            <nav className="flex space-x-6 text-sm font-medium">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`relative pb-1 transition ${
                                            activeSection === section.id
                                                ? "text-accent"
                                                : "hover:text-accent"
                                        }`}
                                    >
                                        {t(section.label)}
  
                                        {activeSection === section.id && (
                                            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-accent rounded-full"></span>
                                        )}                                        
                                    </button>
                                ))}
                            </nav>

                            <div className="h-6 w-px border border-soft" />

                            {/* ===== LANGUAGE + THEME ===== */}
                            <div className="flex items-center space-x-3">

                                {/* --- LANGUAGE DROPDOWN --- */}
                                <div className="relative" ref={langRef}>
                                    <button
                                        onClick={() => setOpenLang(!openLang)}
                                        className="flex items-center space-x-2 text-sm px-3 py-2 border border-button rounded-xl hover:bg-secondary transition"
                                    >
                                        <Globe size={16} />
                                        <span>{language}</span>
                                        <ChevronDown size={14} />
                                    </button>

                                    {openLang && (
                                    <div className="absolute right-0 mt-2 w-28 surface-primary border border-soft rounded-xl shadow-lg">
                                        {languages.map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => changeLanguage(lang)}
                                            className="block w-full text-left px-4 py-2 hover:bg-secondary text-sm"
                                        >
                                            {t(`language.${lang}`)}
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>

                                {/* --- THEME DROPDOWN --- */}
                                <div className="relative" ref={themeRef}>
                                    <button
                                        onClick={() => setOpenTheme(!openTheme)}
                                        className="flex items-center space-x-2 text-sm px-3 py-2 border border-button rounded-xl hover:bg-secondary transition"
                                    >
                                        {theme === "Dark" ? <Moon size={16} /> : <Sun size={16} />}
                                        <span>{t(`theme.${theme}`)}</span>
                                        <ChevronDown size={14} />
                                    </button>

                                    {openTheme && (
                                    <div className="absolute right-0 mt-2 w-28 surface-primary border border-soft rounded-xl shadow-lg">
                                        {themes.map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => changeTheme(mode)}
                                            className="block w-full text-left px-4 py-2 hover:bg-secondary text-sm"
                                        >
                                            {t(`theme.${mode}`)}
                                        </button>
                                        ))}
                                    </div>
                                    )}
                                </div>

                            </div>

                            {/* ===== DOWNLOAD CV BUTTON ===== */}
                            <button className="px-5 py-2 bg-accent bg-accent-hover transition rounded-xl text-sm font-semibold text-white shadow-lg">
                                {t("header.downloadCV")}
                            </button>

                        </div>
                    </div>

                    {/* =====================================================
                        MOBILE HEADER BAR
                    ===================================================== */}
                    <div className="flex md:hidden w-full items-center justify-between">

                        <div className="w-8" /> {/* spacer */}

                        <h1 className="text-lg font-bold text-accent text-center">
                            Castillo Sites
                        </h1>

                        <button onClick={() => {
                            setMobileMenuOpen(!mobileMenuOpen)
                        }}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                
            </header>

            {/* =====================================================
                MOBILE DROPDOWN MENU
            ===================================================== */}
            <div
                className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:hidden z-50 transform transition-transform duration-300 ease-in-out surface-primary ${
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >  
                <div className="px-6 py-6 space-y-6 h-full overflow-y-auto">

                    {/* ================= MAIN MOBILE MENU ================= */}
                    {mobileView === "menu" && (
                    <>
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`block text-sm font-medium py-1 ${
                                    activeSection === section.id
                                        ? "text-accent"
                                        : "hover:text-accent"
                                }`}
                            >
                                {t(section.label)}
                            </button>
                        ))}

                        <button className="mx-auto block px-4 py-2 bg-accent hover:bg-accent-hover transition rounded-lg text-sm font-semibold text-white">
                            {t("header.downloadCV")}
                        </button>

                        {/* LANGUAGE ENTRY */}
                        <button
                            onClick={() => setMobileView("language")}
                            className="flex items-center justify-between w-full text-sm py-3"
                        >
                            <span className="flex items-center space-x-2">
                                <Globe size={16} />
                                <span className="opacity-70">
                                    {t(`language.${language}`)}
                                </span>
                            </span>
                            <ChevronRight size={16} />
                        </button>

                        {/* THEME ENTRY */}
                        <button
                            onClick={() => setMobileView("theme")}
                            className="flex items-center justify-between w-full text-sm py-3"
                        >
                            <span className="flex items-center space-x-2">
                                {theme === "Dark" ? <Moon size={16} /> : <Sun size={16} />}
                                <span className="opacity-70">{t(`theme.${theme}`)}</span>
                            </span>
                            <ChevronRight size={16} />
                        </button>
                    </>
                    )}

                    {/* ================= LANGUAGE VIEW ================= */}
                    {mobileView === "language" && (
                    <>
                        <button
                            onClick={() => setMobileView("menu")}
                            className="flex items-center space-x-2 text-sm font-semibold"
                        >
                            <ChevronLeft size={16} />
                            <span>{t("header.language")}</span>
                        </button>

                        <div className="pt-4 space-y-3">
                            {languages.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => {
                                        changeLanguage(lang)
                                        setMobileView("menu")
                                    }}
                                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg ${
                                        language === lang
                                        ? "bg-accent text-white"
                                        : "hover:bg-secondary"
                                    }`}
                                    >
                                    {t(`language.${lang}`)}
                                </button>
                            ))}
                        </div>
                    </>
                    )}

                    {/* ================= THEME VIEW ================= */}
                    {mobileView === "theme" && (
                    <>
                        <button
                            onClick={() => setMobileView("menu")}
                            className="flex items-center space-x-2 text-sm font-semibold"
                        >
                            <ChevronLeft size={16} />
                            <span>{t("header.theme")}</span>
                        </button>

                        <div className="pt-4 space-y-3">
                            {themes.map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => {
                                        changeTheme(mode)
                                        setMobileView("menu")
                                    }}
                                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg ${
                                        theme === mode
                                        ? "bg-accent text-white"
                                        : "hover:bg-secondary"
                                    }`}
                                    >
                                    {t(`theme.${mode}`)}
                                </button>
                            ))}
                        </div>
                    </>
                    )}

                </div>
            </div>
            
        </>
    )
}

export default Header