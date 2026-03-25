import { useState } from "react"
import { useTranslation } from "@/hooks/useTranslation"
import Modal from "@/views/components/Modal"

import AboutCard from "./components/AboutCard"

import DescriptionContent from "./content/DescriptionContent"
import SkillsContent from "./content/SkillsContent"
import EducationContent from "./content/EducationContent"

type ModalType = "description" | "skills" | "education" | null

function About() {
    const { t } = useTranslation()
    const [activeModal, setActiveModal] = useState<ModalType>(null)

    return (
      <section id="about" className="min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto w-full py-16">

          {/* HEADER */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">
                {t("about.title")}
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-body text-secondary">
                {t("about.subtitle")}
            </p>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AboutCard
              iconKey="user"
              title={t("about.description")}
              onClick={() => setActiveModal("description")}
            />

            <AboutCard
              iconKey="skills"
              title={t("about.skills")}
              onClick={() => setActiveModal("skills")}
            />

            <AboutCard
              iconKey="education"
              title={t("about.education")}
              onClick={() => setActiveModal("education")}
            />
          </div>
        </div>

        {/* MODAL */}
        {activeModal && (
          <Modal onClose={() => setActiveModal(null)}>
            {activeModal === "description" && <DescriptionContent />}
            {activeModal === "skills" && <SkillsContent />}
            {activeModal === "education" && <EducationContent />}
          </Modal>
        )}
      </section>
    )
}

export default About