import { useState } from "react"
import AboutCard from "../components/AboutCard"
import AboutModal from "../components/AboutModal"

import DescriptionContent from "../content/DescriptionContent"
import SkillsContent from "../content/SkillsContent"
import EducationContent from "../content/EducationContent"

type ModalType = "description" | "skills" | "education" | null

function About() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  return (
    <section id="about" className="min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto w-full px-6 py-16">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            About Me
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-secondary">
            Learn more about my background, skills and experience as a developer.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AboutCard
            iconKey="user"
            title="Description"
            onClick={() => setActiveModal("description")}
          />

          <AboutCard
            iconKey="skills"
            title="Skills"
            onClick={() => setActiveModal("skills")}
          />

          <AboutCard
            iconKey="education"
            title="Education"
            onClick={() => setActiveModal("education")}
          />
        </div>
      </div>

      {/* MODAL */}
      {activeModal && (
        <AboutModal onClose={() => setActiveModal(null)}>
          {activeModal === "description" && <DescriptionContent />}
          {activeModal === "skills" && <SkillsContent />}
          {activeModal === "education" && <EducationContent />}
        </AboutModal>
      )}
    </section>
  )
}

export default About