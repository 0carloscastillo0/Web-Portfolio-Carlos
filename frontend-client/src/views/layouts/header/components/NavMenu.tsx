type Props = {
  sections: { id: string; label: string }[]
  activeSection: string
  onNavigate: (id: string) => void
  t: (key: string) => string
}

function NavMenu({ sections, activeSection, onNavigate, t }: Props) {
  return (
    <nav className="flex space-x-6 text-sm font-medium">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onNavigate(section.id)}
          className={`relative pb-1 transition ${
            activeSection === section.id
              ? "text-accent"
              : "hover:text-accent"
          }`}
        >
          {t(section.label)}

          {activeSection === section.id && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-accent rounded-full"></span>
          )}
        </button>
      ))}
    </nav>
  )
}

export default NavMenu