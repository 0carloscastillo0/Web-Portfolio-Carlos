import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"

import ProjectContent from "./ProjectContent"
import * as projectService from "@/modules/project/project.service"

/**
 * Mock carousel (avoid complexity)
 */
vi.mock("../components/ProjectCarousel", () => ({
  default: ({ images }: any) => (
    <div>Carousel {images.length}</div>
  ),
}))

/**
 * Helper
 */
const renderComponent = (projectId = "1") => {
  return render(<ProjectContent projectId={projectId} />)
}

describe("ProjectContent", () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  /**
   * Should render loading state initially
   */
  it("should render loading state", async () => {
    vi.spyOn(projectService, "getProjectById").mockResolvedValueOnce(null as any)
    vi.spyOn(projectService, "getProjectImages").mockResolvedValueOnce([])

    renderComponent()

    // Initial state
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // Wait for async effect to settle (prevents act warning)
    await screen.findByText(/loading/i)
  })

  /**
   * Should render project data
   */
  it("should render project info", async () => {
    vi.spyOn(projectService, "getProjectById").mockResolvedValueOnce({
      id: "1",
      title: "Test Project",
      startDate: "2023-01-01",
      endDate: "2023-06-01",
      description: "Simple description",
      skills: [{ id: "1", name: "React" }],
    } as any)

    vi.spyOn(projectService, "getProjectImages").mockResolvedValueOnce([
      { id: "img1", url: "/img.jpg" },
    ] as any)

    renderComponent()

    // Wait for content
    expect(await screen.findByText("Test Project")).toBeInTheDocument()

    expect(screen.getByText(/react/i)).toBeInTheDocument()
    expect(screen.getByText(/simple description/i)).toBeInTheDocument()
    expect(screen.getByText(/carousel 1/i)).toBeInTheDocument()
  })

  /**
   * Should render description as list when contains bullets
   */
  it("should render description as list", async () => {
    vi.spyOn(projectService, "getProjectById").mockResolvedValueOnce({
      id: "1",
      title: "Test Project",
      startDate: "2023-01-01",
      endDate: "2023-06-01",
      description: "• Item one • Item two",
      skills: [],
    } as any)

    vi.spyOn(projectService, "getProjectImages").mockResolvedValueOnce([])

    renderComponent()

    expect(await screen.findByText("Item one")).toBeInTheDocument()
    expect(screen.getByText("Item two")).toBeInTheDocument()

    expect(screen.getByRole("list")).toBeInTheDocument()
  })

  /**
   * Should render description as paragraph when no bullets
   */
  it("should render description as paragraph", async () => {
    vi.spyOn(projectService, "getProjectById").mockResolvedValueOnce({
      id: "1",
      title: "Test Project",
      startDate: "2023-01-01",
      endDate: "2023-06-01",
      description: "Plain description",
      skills: [],
    } as any)

    vi.spyOn(projectService, "getProjectImages").mockResolvedValueOnce([])

    renderComponent()

    expect(await screen.findByText("Plain description")).toBeInTheDocument()

    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })
})