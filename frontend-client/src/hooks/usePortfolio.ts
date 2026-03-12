import { useContext } from "react"
import { PortfolioContext } from "../contexts/PortfolioContext"

export const usePortfolio = () => {
  return useContext(PortfolioContext)
}