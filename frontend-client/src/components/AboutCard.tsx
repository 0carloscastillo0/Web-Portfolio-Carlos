import { iconMap } from "../utils/iconMap"

type Props = {
  iconKey: keyof typeof iconMap
  title: string
  onClick: () => void
}

function AboutCard({ iconKey, title, onClick }: Props) {
  const Icon = iconMap[iconKey]

  return (
    <button
      onClick={onClick}
      className="
        group
        border border-soft
        rounded-xl
        p-10
        flex flex-col items-center justify-center
        gap-6
        surface-secondary
        hover:bg-secondary
        hover:scale-105
        transition-all duration-300
      "
    >
      <div className="text-accent group-hover:scale-110 transition-transform duration-300">
        {Icon && <Icon size={48} />}
      </div>

      <span className="text-lg font-medium text-accent">
        {title}
      </span>
    </button>
  )
}

export default AboutCard