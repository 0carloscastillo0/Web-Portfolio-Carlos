import type { Project } from "@/modules/portfolio.interface"
import Card from "@/views/components/Card"
import { formatDateRange } from "@/utils/date"

type Props = {
  project: Project
  onClick: () => void
}

function ProjectCard({ project, onClick }: Props) {
  return (
    <Card onClick={onClick} className="overflow-hidden text-left">
      
      {/* IMAGE */}
      <div className="w-full h-48 md:h-52 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-2xl text-primary">
          {project.title}
        </h3>

        <p className="text-xl text-muted">
          {formatDateRange(project.startDate, project.endDate)}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.skills.map((s) => (
            <span
              key={s.id}
              className="text-sm px-3 py-1.5 rounded-lg surface-primary border border-soft"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>

    </Card>
  )
}

export default ProjectCard