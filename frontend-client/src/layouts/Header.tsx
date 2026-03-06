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

function Header() {

    /* =====================================================
        TYPES & CONSTANTS
    ===================================================== */

    const languages = ["EN", "ES"] as const
    type Language = typeof languages[number]

    const themes = ["Dark", "Light"] as const

    type MobileView = "menu" | "language" | "theme"

    const languageLabels: Record<Language, string> = {
        EN: "English",
        ES: "Español"
    }

    /* =====================================================
        STATE
    ===================================================== */
    const { theme, setTheme } = useTheme()
    const [language, setLanguage] = useState<Language>("EN")

    const [openLang, setOpenLang] = useState(false)
    const [openTheme, setOpenTheme] = useState(false)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileView, setMobileView] = useState<MobileView>("menu")

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

    /* =====================================================
        HANDLERS
    ===================================================== */

    const changeTheme = (selected: "Dark" | "Light") => {
        setTheme(selected)
        setOpenTheme(false)
    }

    const changeLanguage = (selected: Language) => {
        setLanguage(selected)
        setOpenLang(false)
    }

    /* =====================================================
        RENDER
    ===================================================== */

    return (
        <header className="border-b border-soft surface-primary">
              
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
                            <a href="#home" className="hover:text-accent transition">Home</a>
                            <a href="#about" className="hover:text-accent transition">About Me</a>
                            <a href="#projects" className="hover:text-accent transition">Projects</a>
                        </nav>

                        <div className="h-6 w-px bg-[var(--border-primary)]" />

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
                                        {languageLabels[lang]}
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
                                    <span>{theme}</span>
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
                                        {mode}
                                    </button>
                                    ))}
                                </div>
                                )}
                            </div>

                        </div>

                        {/* ===== DOWNLOAD CV BUTTON ===== */}
                        <button className="px-5 py-2 bg-accent bg-accent-hover transition rounded-xl text-sm font-semibold text-white shadow-lg">
                            Download CV
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

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* =====================================================
                MOBILE DROPDOWN MENU
            ===================================================== */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-primary border-t border-secondary">
                    <div className="px-6 py-6 space-y-4">

                        {/* ================= MAIN MOBILE MENU ================= */}
                        {mobileView === "menu" && (
                        <>
                            <a className="block text-sm hover:text-accent">Home</a>
                            <a className="block text-sm hover:text-accent">About Me</a>
                            <a className="block text-sm hover:text-accent">Projects</a>

                            <button className="mx-auto block px-4 py-2 bg-accent hover:bg-accent-hover transition rounded-lg text-sm font-semibold text-white">
                                Download CV
                            </button>

                            {/* LANGUAGE ENTRY */}
                            <button
                                onClick={() => setMobileView("language")}
                                className="flex items-center justify-between w-full text-sm py-2"
                            >
                                <span className="flex items-center space-x-2">
                                    <span>🌐</span>
                                    <span className="opacity-70">
                                        {languageLabels[language]}
                                    </span>
                                </span>
                                <ChevronRight size={16} />
                            </button>

                            {/* THEME ENTRY */}
                            <button
                                onClick={() => setMobileView("theme")}
                                className="flex items-center justify-between w-full text-sm py-2"
                            >
                                <span className="flex items-center space-x-2">
                                    {theme === "Dark" ? <Moon size={16} /> : <Sun size={16} />}
                                    <span className="opacity-70">{theme}</span>
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
                                <span>Language</span>
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
                                        {languageLabels[lang]}
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
                                <span>Theme</span>
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
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </>
                        )}

                    </div>
                </div>
            )}
        </header>
    )
}

export default Header