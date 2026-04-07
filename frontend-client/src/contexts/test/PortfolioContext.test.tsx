import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { PortfolioProvider } from "@/contexts/PortfolioContext"
import { usePortfolio } from "@/hooks/usePortfolio"

const TestComponent = () => {
  const { loading, projects } = usePortfolio()

  if (loading) return <p>Loading...</p>

  return <p>Projects: {projects.length}</p>
}

describe("PortfolioProvider", () => {
  it("should load portfolio data", async () => {
    render(
      <PortfolioProvider>
        <TestComponent />
      </PortfolioProvider>
    )

    // estado inicial
    expect(screen.getByText("Loading...")).toBeInTheDocument()

    // espera a que cargue
    await waitFor(() => {
      expect(screen.getByText(/Projects:/)).toBeInTheDocument()
    })
  })
})