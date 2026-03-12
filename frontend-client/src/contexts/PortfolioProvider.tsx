import { useEffect, useState } from "react"
import { PortfolioContext } from "./PortfolioContext"
import type { PortfolioData } from "../types/portfolio.types"
import { fallbackContacts } from "../data/fallbackContact"
import { fallbackProfile } from "../data/fallbackProfile"
import { resolveData, resolveArray } from "../utils/resolveData"

import { getProfile } from "../services/profile.service"
import { getContacts } from "../services/contact.service"

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {

  const [data, setData] = useState<PortfolioData>({
    profile: null,
    contacts: []
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const loadPortfolio = async () => {

      try {

        const [profile, contacts] = await Promise.all([
          getProfile(),
          getContacts()
        ])

        setData({
          profile: resolveData(profile, fallbackProfile),
          contacts: resolveArray(contacts, fallbackContacts)
        })

      } catch {

        setError("Error loading portfolio")
        setData({
          profile: fallbackProfile,
          contacts: fallbackContacts
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