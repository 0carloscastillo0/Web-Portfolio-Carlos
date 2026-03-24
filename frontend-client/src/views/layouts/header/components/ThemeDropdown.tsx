import { useState, useRef, useEffect } from "react"
import { Sun, Moon, ChevronDown } from "lucide-react"

type Props = {
  theme: "Dark" | "Light"
  themes: readonly ("Dark" | "Light")[]
  onChangeTheme: (theme: "Dark" | "Light") => void
  t: (key: string) => string
}

function ThemeDropdown({
  theme,
  themes,
  onChangeTheme,
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
        {theme === "Dark" ? <Moon size={16} /> : <Sun size={16} />}
        <span>{t(`theme.${theme}`)}</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 surface-primary border border-soft rounded-xl shadow-lg">
          {themes.map((mode) => (
            <button
              key={mode}
              onClick={() => {
                onChangeTheme(mode)
                setOpen(false)
              }}
              className="block w-full text-left px-4 py-2 hover:bg-secondary text-sm"
            >
              {t(`theme.${mode}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeDropdown