import { useEffect, useState } from "react"
import { PortfolioContext } from "./PortfolioContext"
import type { PortfolioData } from "../types/portfolio.types"

import { fallbackContacts } from "../data/fallbackContact"
import { fallbackProfile } from "../data/fallbackProfile"
import { fallbackSkills } from "../data/fallbackSkill"
import { fallbackEducations } from "../data/fallbackEducation"
import { fallbackProjects } from "../data/fallbackProject"

import { resolveData, resolveArray } from "../utils/resolveData"

import { getProfile } from "../services/profile.service"
import { getContacts } from "../services/contact.service"
import { getUserSkills } from "../services/skill.service"
import { getEducations } from "../services/education.service"
import { getProjects } from "../services/project.service"

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

        setData({
          profile: resolveData(profile, fallbackProfile),
          contacts: resolveArray(contacts, fallbackContacts),
          skills: resolveArray(skills, fallbackSkills),
          educations: resolveArray(educations, fallbackEducations),
          projects: resolveArray(projects, fallbackProjects),
        })

      } catch {

        setError("Error loading portfolio")

        setData({
          profile: fallbackProfile,
          contacts: fallbackContacts,
          skills: fallbackSkills,
          educations: fallbackEducations,
          projects: fallbackProjects,
        })

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