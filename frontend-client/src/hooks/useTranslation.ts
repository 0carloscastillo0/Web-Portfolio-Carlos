import { translations } from "../i18n"
import { useLanguage } from "../contexts/LanguageContext"

export function useTranslation() {

  const { language } = useLanguage()

  const t = (path: string) => {

    const keys = path.split(".")
    let value: any = translations[language]

    for (const key of keys) {
      value = value[key]
    }

    return value
  }

  return { t }
}