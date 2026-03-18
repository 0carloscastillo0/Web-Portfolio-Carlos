function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col"
    >
      <div className="max-w-6xl mx-auto w-full px-6 py-16">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            About Me
          </h2>

          <p className="mt-4 max-w-2xl mx-auto">
            Here you can talk about your experience, skills and background as a developer.
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 flex items-start justify-center">
          {/* Aquí irá tu contenido real */}
          <p className="opacity-50">
            About content here...
          </p>
        </div>

      </div>
    </section>
  )
}

export default About