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

function Header() {

    /* =====================================================
        TYPES & CONSTANTS
    ===================================================== */

    const languages = ["EN", "ES"] as const
    type Language = typeof languages[number]

    const themes = ["Dark", "Light"] as const
    type Theme = typeof themes[number]

    type MobileView = "menu" | "language" | "theme"

    const languageLabels: Record<Language, string> = {
        EN: "English",
        ES: "Español"
    }

    /* =====================================================
        STATE
    ===================================================== */

    const [language, setLanguage] = useState<Language>("EN")
    const [theme, setTheme] = useState<Theme>("Dark")

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

    const changeTheme = (selected: Theme) => {
        setTheme(selected)
        document.documentElement.classList.toggle("dark", selected === "Dark")
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
        <header className="w-full border-b border-slate-800 bg-slate-950 text-slate-200 relative">

            {/* ================= CONTAINER ================= */}
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* =====================================================
                    DESKTOP LAYOUT
                ===================================================== */}
                <div className="hidden md:flex w-full items-center justify-between">

                    {/* -------- LEFT: SITE TITLE -------- */}
                    <h1 className="text-xl font-bold text-cyan-400">
                        Castillo Sites
                    </h1>

                    {/* -------- RIGHT SIDE -------- */}
                    <div className="flex items-center space-x-8">

                        {/* ===== NAVIGATION MENU ===== */}
                        <nav className="flex space-x-6 text-sm font-medium">
                            <a href="#home" className="hover:text-cyan-400 transition">Home</a>
                            <a href="#about" className="hover:text-cyan-400 transition">About Me</a>
                            <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
                        </nav>

                        <div className="h-6 w-px bg-slate-700" />

                        {/* ===== LANGUAGE + THEME ===== */}
                        <div className="flex items-center space-x-3">

                            {/* --- LANGUAGE DROPDOWN --- */}
                            <div className="relative" ref={langRef}>
                                <button
                                    onClick={() => setOpenLang(!openLang)}
                                    className="flex items-center space-x-2 text-sm px-3 py-2 border border-slate-700 rounded-xl hover:bg-slate-800 transition"
                                >
                                    <Globe size={16} />
                                    <span>{language}</span>
                                    <ChevronDown size={14} />
                                </button>

                                {openLang && (
                                <div className="absolute right-0 mt-2 w-28 bg-slate-900 border border-slate-700 rounded-xl shadow-lg">
                                    {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => changeLanguage(lang)}
                                        className="block w-full text-left px-4 py-2 hover:bg-slate-800 text-sm"
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
                                    className="flex items-center space-x-2 text-sm px-3 py-2 border border-slate-700 rounded-xl hover:bg-slate-800 transition"
                                >
                                    {theme === "Dark" ? <Moon size={16} /> : <Sun size={16} />}
                                    <span>{theme}</span>
                                    <ChevronDown size={14} />
                                </button>

                                {openTheme && (
                                <div className="absolute right-0 mt-2 w-28 bg-slate-900 border border-slate-700 rounded-xl shadow-lg">
                                    {themes.map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => changeTheme(mode)}
                                        className="block w-full text-left px-4 py-2 hover:bg-slate-800 text-sm"
                                    >
                                        {mode}
                                    </button>
                                    ))}
                                </div>
                                )}
                            </div>

                        </div>

                        {/* ===== DOWNLOAD CV BUTTON ===== */}
                        <button className="px-5 py-2 bg-cyan-500 hover:bg-cyan-600 transition rounded-xl text-sm font-semibold text-white shadow-lg">
                            Download CV
                        </button>

                    </div>
                </div>

                {/* =====================================================
                    MOBILE HEADER BAR
                ===================================================== */}
                <div className="flex md:hidden w-full items-center justify-between">

                    <div className="w-8" /> {/* spacer */}

                    <h1 className="text-lg font-bold text-cyan-400 text-center">
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
                <div className="md:hidden bg-slate-900 border-t border-slate-800">
                    <div className="px-6 py-6 space-y-4">

                        {/* ================= MAIN MOBILE MENU ================= */}
                        {mobileView === "menu" && (
                        <>
                            <a className="block text-sm hover:text-cyan-400">Home</a>
                            <a className="block text-sm hover:text-cyan-400">About Me</a>
                            <a className="block text-sm hover:text-cyan-400">Projects</a>

                            <button className="mx-auto block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition rounded-lg text-sm font-semibold text-white">
                                Download CV
                            </button>

                            {/* LANGUAGE ENTRY */}
                            <button
                                onClick={() => setMobileView("language")}
                                className="flex items-center justify-between w-full text-sm py-2"
                            >
                                <span className="flex items-center space-x-2">
                                    <span>🌐</span>
                                    <span className="text-slate-400">
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
                                    <span className="text-slate-400">{theme}</span>
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
                                            ? "bg-cyan-500 text-white"
                                            : "hover:bg-slate-800"
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
                                            ? "bg-cyan-500 text-white"
                                            : "hover:bg-slate-800"
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