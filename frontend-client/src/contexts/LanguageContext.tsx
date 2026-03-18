import { createContext, useContext, useEffect, useState } from "react"
import { translations } from "../i18n"
import type { Language } from "../i18n"

type LanguageContextType = {
    language: Language
    setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Detects the user's preferred language using localStorage and browser settings
const detectBrowserLanguage = (): Language => {

    const savedLanguage = localStorage.getItem("language")

    if (savedLanguage && savedLanguage in translations) {
        return savedLanguage as Language
    }

    const browserLang = (navigator.languages?.[0] || navigator.language)
        .slice(0, 2)
        .toUpperCase()

    if (browserLang in translations) {
        return browserLang as Language
    }

    return "EN"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {

    const [language, setLanguage] = useState<Language>(() => {
        return detectBrowserLanguage()
    })

    useEffect(() => {
        localStorage.setItem("language", language)
    }, [language])

    useEffect(() => {
        document.documentElement.lang = language.toLowerCase()
    }, [language])

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {

    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error("useLanguage must be used inside LanguageProvider")
    }

    return context
}