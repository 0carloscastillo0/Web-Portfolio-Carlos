import { ChevronRight, Globe, Moon, Sun, ChevronLeft } from "lucide-react"
import type { Language } from "@/i18n/index"

type Props = {
  isOpen: boolean
  sections: { id: string; label: string }[]
  activeSection: string
  onNavigate: (id: string) => void

  mobileView: "menu" | "language" | "theme"
  setMobileView: (view: "menu" | "language" | "theme") => void

  language: Language
  languages: Language[]
  onChangeLanguage: (lang: Language) => void

  theme: "Dark" | "Light"
  themes: readonly ("Dark" | "Light")[]
  onChangeTheme: (theme: "Dark" | "Light") => void

  t: (key: string) => string
}

function MobileMenu({
  isOpen,
  sections,
  activeSection,
  onNavigate,
  mobileView,
  setMobileView,
  language,
  languages,
  onChangeLanguage,
  theme,
  themes,
  onChangeTheme,
  t
}: Props) {
  return (
    <div
      className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:hidden z-50 transform transition-transform surface-primary ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
        <div className="px-6 py-6 space-y-6 h-full overflow-y-auto">

            {/* ================= MAIN MOBILE MENU ================= */}
            {mobileView === "menu" && (
            <>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => onNavigate(section.id)}
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
                                onChangeLanguage(lang)
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
                                onChangeTheme(mode)
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
  )
}

export default MobileMenu