import { useEffect, useState } from "react"
import {
  getProjectById,
  getProjectImages
} from "../services/project.service"
import ProjectCarousel from "../components/ProjectCarousel"

type Props = {
  projectId: string
}

function ProjectContent({ projectId }: Props) {
  const [project, setProject] = useState<any>(null)
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getProjectById(projectId)
      const imgs = await getProjectImages(projectId)

      setProject(data)
      setImages(imgs)
    }

    load()
  }, [projectId])

  if (!project) return <div>Loading...</div>

  const getYear = (date: string) => new Date(date).getFullYear()

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <h3 className="text-subtitle text-accent">
        {project.title}
      </h3>

      {/* DATES */}
      <p className="text-xl text-muted">
        {getYear(project.startDate)} - {getYear(project.endDate)}
      </p>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-2">
        {project.skills.map((s: any) => (
          <span
            key={s.id}
            className="text-sm px-2 py-1 bg-secondary rounded"
          >
            {s.name}
          </span>
        ))}
      </div>

      {/* CAROUSEL */}
      <ProjectCarousel images={images} />

      {/* DESCRIPTION */}
      <p className="text-secondary leading-relaxed">
        {project.description}
      </p>

    </div>
  )
}

export default ProjectContent