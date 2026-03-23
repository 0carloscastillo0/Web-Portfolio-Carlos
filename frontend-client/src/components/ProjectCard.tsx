import type { Project } from "../types/portfolio.types"

type Props = {
  project: Project
  onClick: () => void
}

function ProjectCard({ project, onClick }: Props) {
  const getYear = (date: string) => new Date(date).getFullYear()

  return (
    <button
      onClick={onClick}
      className="
        w-full
        flex flex-col
        rounded-xl
        surface-secondary
        border border-soft
        overflow-hidden
        text-left
        hover:bg-secondary
        hover:scale-[1.02]
        transition-all duration-300
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="w-full h-48 md:h-52 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="
            w-full h-full
            object-cover
          "
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 flex flex-col gap-3">

        {/* TITLE */}
        <h3 className="text-2xl text-primary">
          {project.title}
        </h3>

        {/* DATE */}
        <p className="text-xl text-muted">
          {getYear(project.startDate)} - {getYear(project.endDate)}
        </p>

        {/* SKILLS */}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.skills.map((s) => (
            <span
              key={s.id}
              className="
                text-sm
                px-3 py-1.5
                rounded-lg
                surface-primary
                border border-soft
              "
            >
              {s.name}
            </span>
          ))}
        </div>

      </div>
    </button>
  )
}

export default ProjectCard