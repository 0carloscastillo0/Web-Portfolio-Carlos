import { createContext, useEffect, useMemo, useState } from "react"

import type { PortfolioData } from "@/modules/portfolio.interface"
import { getProfile } from "@/modules/profile/profile.service"
import { getSocialLinks } from "@/modules/socialLink/socialLink.service"
import { getUserSkills } from "@/modules/skill/skill.service"
import { getEducations } from "@/modules/education/education.service"
import { getProjects } from "@/modules/project/project.service"

type PortfolioContextType = PortfolioData & {
  loading: boolean
  error: string | null
}

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {

  const [data, setData] = useState<PortfolioData>({
    profile: null,
    socialLinks: [],
    skills: [],
    educations: [],
    projects: []
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const [profile, socialLinks, skills, educations, projects] = await Promise.all([
          getProfile(),
          getSocialLinks(),
          getUserSkills(),
          getEducations(),
          getProjects()
        ])

        setData({ profile, socialLinks, skills, educations, projects })

      } catch {
        setError("Unexpected error loading portfolio")
      } finally {
        setLoading(false)
      }
    }

    loadPortfolio()
  }, [])


  const value = useMemo(() => ({
    ...data,
    loading,
    error
  }), [data, loading, error])

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const PortfolioContext = createContext<PortfolioContextType>({
  profile: null,
  socialLinks: [],
  skills: [],
  educations: [],
  projects: [],
  loading: true,
  error: null
})