import { describe, it, expect } from "vitest"
import { renderHook } from "@testing-library/react"
import { useTranslation } from "@/hooks/useTranslation"
import { LanguageContext } from "@/contexts/LanguageContext"
import { translations } from "@/i18n"
import type { Language } from "@/i18n"

describe("useTranslation", () => {

  const language: Language = "EN"
  
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LanguageContext.Provider value={{ language, setLanguage: () => {} }}>
      {children}
    </LanguageContext.Provider>
  )

  it("should return translation for given key", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper })
    const value = result.current.t("home.greeting")

    expect(value).toBe(translations[language].home.greeting)
  })

  it("should return undefined for invalid key", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper })
    const value = result.current.t("invalid.key")

    expect(value).toBeUndefined()
  })

})