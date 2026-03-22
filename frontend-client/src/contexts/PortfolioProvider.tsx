import { useEffect, useState } from "react"
import { PortfolioContext } from "./PortfolioContext"
import type { PortfolioData } from "../types/portfolio.types"
import { fallbackContacts } from "../data/fallbackContact"
import { fallbackProfile } from "../data/fallbackProfile"
import { fallbackSkills } from "../data/fallbackSkill"
import { fallbackEducations } from "../data/fallbackEducation"
import { resolveData, resolveArray } from "../utils/resolveData"

import { getProfile } from "../services/profile.service"
import { getContacts } from "../services/contact.service"
import { getUserSkills } from "../services/skill.service"
import { getEducations } from "../services/education.service"

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {

  const [data, setData] = useState<PortfolioData>({
    profile: null,
    contacts: [],
    skills: [],
    educations: []
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const loadPortfolio = async () => {

      try {

        const [profile, contacts, skills, educations] = await Promise.all([
          getProfile(),
          getContacts(),
          getUserSkills(),
          getEducations(),
        ])

        setData({
          profile: resolveData(profile, fallbackProfile),
          contacts: resolveArray(contacts, fallbackContacts),
          skills: resolveArray(skills, fallbackSkills),
          educations: resolveArray(educations, fallbackEducations),
        })

      } catch {

        setError("Error loading portfolio")
        setData({
          profile: fallbackProfile,
          contacts: fallbackContacts,
          skills: fallbackSkills,
          educations: fallbackEducations,
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