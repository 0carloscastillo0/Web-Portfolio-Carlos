import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown } from "lucide-react"
import type { Language } from "../../../../i18n/index"

type Props = {
  language: Language
  languages: Language[]
  onChangeLanguage: (lang: Language) => void
  t: (key: string) => string
}

function LanguageDropdown({
  language,
  languages,
  onChangeLanguage,
  t
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 text-sm px-3 py-2 border border-button rounded-xl hover:bg-secondary transition"
      >
        <Globe size={16} />
        <span>{language}</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 surface-primary border border-soft rounded-xl shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onChangeLanguage(lang)
                setOpen(false)
              }}
              className="block w-full text-left px-4 py-2 hover:bg-secondary text-sm"
            >
              {t(`language.${lang}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown