function EducationContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-accent">
        Education
      </h3>

      <div className="space-y-4 text-secondary">
        <div>
          <p className="font-semibold text-primary">
            Software Engineering
          </p>
          <p className="text-muted">
            University / Institute Name
          </p>
        </div>

        <div>
          <p className="font-semibold text-primary">
            Additional Courses
          </p>
          <p className="text-muted">
            Web Development, Backend Architecture, UI/UX
          </p>
        </div>
      </div>
    </div>
  )
}

export default EducationContent