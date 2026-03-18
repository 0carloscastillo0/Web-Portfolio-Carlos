function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col"
    >
      <div className="max-w-6xl mx-auto w-full px-6 py-16">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            Projects
          </h2>

          <p className="mt-4 max-w-2xl mx-auto">
            Here you will showcase your work and personal projects.
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 flex items-start justify-center">
          {/* Aquí irá tu grid de proyectos */}
          <p className="opacity-50">
            Projects content here...
          </p>
        </div>

      </div>
    </section>
  )
}

export default Projects