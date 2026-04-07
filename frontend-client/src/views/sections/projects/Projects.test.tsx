import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import Projects from "./Projects"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"

import * as projectService from "@/modules/project/project.service"

/**
 * Mock ProjectCard to simplify interaction
 */
vi.mock("./components/ProjectCard", () => ({
  default: ({ project, onClick }: any) => (
    <button onClick={onClick}>
      {project.title}
    </button>
  ),
}))

/**
 * Mock ProjectContent
 */
vi.mock("./content/ProjectContent", () => ({
  default: ({ projectId }: any) => (
    <div>Project Content {projectId}</div>
  ),
}))

/**
 * Helper to render with providers
 */
const renderProjects = () => {
  return render(
    <ThemeProvider>
      <LanguageProvider>
        <Projects />
      </LanguageProvider>
    </ThemeProvider>
  )
}

describe("Projects Section", () => {

  /**
   * Should render title and subtitle
   */
  it("should render title and subtitle", () => {
    renderProjects()

    expect(
      screen.getByRole("heading", { name: /projects/i })
    ).toBeInTheDocument()
  })

  /**
   * Should fetch and render project cards
   */
  it("should render project list", async () => {
    vi.spyOn(projectService, "getProjects").mockResolvedValueOnce([
      { id: "1", title: "Project One", description: "Description One", startDate: "2023-01-01", endDate: "2023-06-01", skills: [], coverImage: "/test.jpg", projectImages: [] },
      { id: "2", title: "Project Two", description: "Description Two", startDate: "2023-01-01", endDate: "2023-06-01", skills: [], coverImage: "/test.jpg", projectImages: [] },
    ])

    renderProjects()

    expect(await screen.findByText("Project One")).toBeInTheDocument()
    expect(screen.getByText("Project Two")).toBeInTheDocument()
  })

  /**
   * Should open modal when clicking a project
   */
  it("should open project modal", async () => {
    vi.spyOn(projectService, "getProjects").mockResolvedValueOnce([
      { id: "1", title: "Project One", description: "Description One", startDate: "2023-01-01", endDate: "2023-06-01", skills: [], coverImage: "/test.jpg", projectImages: [] },
    ])

    renderProjects()

    const projectButton = await screen.findByText("Project One")
    fireEvent.click(projectButton)

    expect(
      await screen.findByText(/project content 1/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole("dialog")
    ).toBeInTheDocument()
  })

  /**
   * Should close modal correctly
   */
  it("should close modal", async () => {
    vi.spyOn(projectService, "getProjects").mockResolvedValueOnce([
      { id: "1", title: "Project One", description: "Description One", startDate: "2023-01-01", endDate: "2023-06-01", skills: [], coverImage: "/test.jpg", projectImages: [] },
    ])

    renderProjects()

    const projectButton = await screen.findByText("Project One")
    fireEvent.click(projectButton)

    const closeButton = await screen.findByRole("button", { name: /close/i })
    fireEvent.click(closeButton)

    await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })
})