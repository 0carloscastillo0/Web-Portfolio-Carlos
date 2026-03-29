import { useEffect, useState } from "react"
import { PortfolioContext } from "./PortfolioContext"
import type { PortfolioData } from "@/modules/portfolio.interface"

import { getProfile } from "@/modules/profile/profile.service"
import { getContacts } from "@/modules/contact/contact.service"
import { getUserSkills } from "@/modules/skills/skill.service"
import { getEducations } from "@/modules/education/education.service"
import { getProjects } from "@/modules/project/project.service"

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {

  const [data, setData] = useState<PortfolioData>({
    profile: null,
    contacts: [],
    skills: [],
    educations: [],
    projects: [],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const [profile, contacts, skills, educations, projects] = await Promise.all([
          getProfile(),
          getContacts(),
          getUserSkills(),
          getEducations(),
          getProjects(),
        ])

        setData({ profile, contacts, skills, educations, projects })

      } catch {
        setError("Unexpected error loading portfolio")
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  return (
    <PortfolioContext.Provider
      value={{
        ...data,
        loading,
        error
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}