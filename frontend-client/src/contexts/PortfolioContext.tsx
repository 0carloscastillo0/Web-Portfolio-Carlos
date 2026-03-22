import { createContext } from "react"
import type { PortfolioData } from "../types/portfolio.types"

type PortfolioContextType = PortfolioData & {
  loading: boolean
  error: string | null
}

export const PortfolioContext = createContext<PortfolioContextType>({
  profile: null,
  contacts: [],
  skills: [],
  educations: [],
  loading: true,
  error: null
})