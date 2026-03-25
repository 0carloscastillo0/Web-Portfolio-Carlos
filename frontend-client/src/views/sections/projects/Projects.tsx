import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/useTranslation"
import { getProjects } from "@/modules/project/project.service"

import Modal from "@/views/components/Modal"

import ProjectCard from "./components/ProjectCard"
import ProjectContent from "./content/ProjectContent"

function Projects() {
  const { t } = useTranslation()
  
  const [projects, setProjects] = useState<any[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  return (
    <section id="projects" className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full py-16">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            {t("projects.title")}
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-body text-secondary">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelected(project.id)}
            />
          ))}
        </div>

        {/* MODAL */}
        {selected && (
          <Modal onClose={() => setSelected(null)}>
            <ProjectContent projectId={selected} />
          </Modal>
        )}

      </div>
    </section>
  )
}

export default Projects