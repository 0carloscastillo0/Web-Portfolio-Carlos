import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Language } from "@/i18n"

type LanguageContextType = {
    language: Language
    setLanguage: (lang: Language) => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    
    const [language, setLanguage] = useState<Language>(() => {
        const stored = localStorage.getItem("language") as Language | null
        return stored ?? "EN"
    })
    
    useEffect(() => {
        localStorage.setItem("language", language)
    }, [language])

    useEffect(() => {
        document.documentElement.lang = language.toLowerCase()
    }, [language])


    const value = useMemo(() => ({ 
        language, 
        setLanguage 
    }), [language])
    
    return (
        <LanguageContext.Provider value={value}>
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