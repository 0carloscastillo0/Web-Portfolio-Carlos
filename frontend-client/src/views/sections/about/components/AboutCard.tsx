import { iconMap } from "@/utils/iconMap"
import Card from "@/views/components/Card"

type Props = {
  iconKey: keyof typeof iconMap
  title: string
  onClick: () => void
}

function AboutCard({ iconKey, title, onClick }: Props) {
  const Icon = iconMap[iconKey]

  return (
    <Card
      onClick={onClick}
      className="
        p-10
        flex flex-col items-center justify-center
        gap-6
        group
      "
    >
      <div className="text-accent group-hover:scale-110 transition-transform duration-300">
        {Icon && <Icon size={48} />}
      </div>

      <span className="text-lg font-medium text-accent">
        {title}
      </span>
    </Card>
  )
}

export default AboutCard