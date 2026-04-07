import type { Language } from "@/i18n/index"

import NavMenu from "./NavMenu"
import LanguageDropdown from "./LanguageDropdown"
import ThemeDropdown from "./ThemeDropdown"


type Props = {
  sections: { id: string; label: string }[]
  activeSection: string
  onNavigate: (id: string) => void

  language: Language
  languages: Language[]
  onChangeLanguage: (lang: Language) => void

  theme: "Dark" | "Light"
  themes: readonly ("Dark" | "Light")[]
  onChangeTheme: (theme: "Dark" | "Light") => void

  t: (key: string) => string

  cvUrl?: string
}

function DesktopHeader(props: Props) {
  const {
    sections,
    activeSection,
    onNavigate,
    language,
    languages,
    onChangeLanguage,
    theme,
    themes,
    onChangeTheme,
    t,
    cvUrl
  } = props
  return (
    <div className="hidden md:flex w-full items-center justify-between">

      {/* LEFT */}
      <h1 className="text-xl font-bold text-accent">
        Castillo Sites
      </h1>

      {/* RIGHT */}
      <div className="flex items-center space-x-8">

        <NavMenu
          sections={sections}
          activeSection={activeSection}
          onNavigate={onNavigate}
          t={t}
        />

        <div className="h-6 w-px border border-soft" />

        <div className="flex items-center space-x-3">
          <LanguageDropdown
            language={language}
            languages={languages}
            onChangeLanguage={onChangeLanguage}
            t={t}
          />

          <ThemeDropdown
            theme={theme}
            themes={themes}
            onChangeTheme={onChangeTheme}
            t={t}
          />
        </div>

        {cvUrl && (
          <a
            href={cvUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-accent rounded-xl text-sm font-semibold text-white inline-block"
          >
            {t("header.downloadCV")}
          </a>
        )}

      </div>
    </div>
  )
}

export default DesktopHeader