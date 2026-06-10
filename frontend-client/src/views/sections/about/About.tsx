import { useState } from "react"
import { useTranslation } from "@/hooks/useTranslation"
import { usePortfolio } from "@/hooks/usePortfolio"

import Modal from "@/views/components/Modal"
import DownloadCVModal from "@/views/components/DownloadCVModal"

import AboutCard from "./components/AboutCard"

import DescriptionContent from "./content/DescriptionContent"
import SkillsContent from "./content/SkillsContent"
import EducationContent from "./content/EducationContent"

type ModalType = "description" | "skills" | "education" | null

function About() {
    const { t } = useTranslation()
    const [activeModal, setActiveModal] = useState<ModalType>(null)
    const [isCVModalOpen, setIsCVModalOpen] = useState(false)
    const { profile } = usePortfolio()

    return (
      <section className="min-h-screen flex flex-col">
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

        {/* DOWNLOAD CV */}
        <div className="text-center">
          <p className="text-body text-secondary mb-4">
            {t("about.textCV")}
          </p>

          {(profile?.UrlCVES || profile?.UrlCVEN) && (
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="px-5 py-2 bg-accent rounded-xl text-sm font-semibold text-white"
            >
              {t("header.downloadCV")}
            </button>
          )}
        </div>

        {/* MODAL */}
        {activeModal && (
          <Modal onClose={() => setActiveModal(null)}>
            {activeModal === "description" && <DescriptionContent />}
            {activeModal === "skills" && <SkillsContent />}
            {activeModal === "education" && <EducationContent />}
          </Modal>
        )}
        {isCVModalOpen && (
          <DownloadCVModal
            onClose={() => setIsCVModalOpen(false)}
            urlES={profile?.UrlCVES}
            urlEN={profile?.UrlCVEN}
            t={t}
          />
        )}
      </section>
    )
}

export default About