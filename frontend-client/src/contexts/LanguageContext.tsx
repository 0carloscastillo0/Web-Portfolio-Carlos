import { createContext, useContext, useEffect, useState } from "react"
import { translations } from "../i18n"
import type { Language } from "../i18n"

// This context manages the current language of the application, allowing components to access and update it.
type LanguageContextType = {
    language: Language
    setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Detects the user's preferred language using URL, localStorage, and browser settings, with a fallback to English.
const detectBrowserLanguage = (): Language => {

    const urlLang = window.location.pathname.split("/")[1]?.toUpperCase()

    if (urlLang && urlLang in translations) {
        return urlLang as Language
    }

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

// Updates the URL to reflect the current language, ensuring it is the first segment of the path.
const updateURLLanguage = (lang: Language) => {

    const path = window.location.pathname
    const segments = path.split("/").filter(Boolean)

    const supported = Object.keys(translations)
    const currentLang = segments[0]?.toUpperCase()

    if (supported.includes(currentLang)) {

        if (currentLang === lang) return

        segments[0] = lang.toLowerCase()

    } else {

        segments.unshift(lang.toLowerCase())

    }

    const newPath = "/" + segments.join("/")

    window.history.replaceState({}, "", newPath + window.location.hash)
}

// Ensures that the URL always contains a valid language segment, correcting it if necessary.
const ensureURLLanguage = (lang: Language) => {

    const path = window.location.pathname
    const segments = path.split("/").filter(Boolean)

    const supported = Object.keys(translations)

    if (segments.length === 0 || !supported.includes(segments[0].toUpperCase())) {

        const newPath = "/" + lang.toLowerCase() + path

        window.history.replaceState({}, "", newPath + window.location.hash)

    }

}

// Provides the LanguageContext to its children, managing the current language state and synchronizing it with localStorage and the URL.
export function LanguageProvider({ children }: { children: React.ReactNode }) {

    const [language, setLanguage] = useState<Language>(() => {
        const detected = detectBrowserLanguage()
        ensureURLLanguage(detected)
        return detected
    })

    useEffect(() => {
        localStorage.setItem("language", language)
        updateURLLanguage(language)
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

// Custom hook to access the LanguageContext, ensuring it is used within a LanguageProvider.
export function useLanguage() {

    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error("useLanguage must be used inside LanguageProvider")
    }

    return context
}