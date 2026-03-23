import { useEffect, useState } from "react"
import { getProjects } from "../services/project.service"

import ProjectCard from "../components/ProjectCard"
import ProjectContent from "../content/ProjectContent"
import Modal from "../components/Modal"

function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  return (
    <section id="projects" className="min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-6 py-16">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            Projects
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-secondary">
            Here you will showcase your work and personal projects.
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