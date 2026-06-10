import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

import LazyRenderSection from "../LazyRenderSection"

// Mock Intersection Observer
vi.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: true,
  }),
}))

describe("LazyRenderSection", () => {

  it("renders children correctly", () => {

    render(
      <LazyRenderSection id="about">
        <div>About Section</div>
      </LazyRenderSection>
    )

    expect(
      screen.getByText("About Section")
    ).toBeInTheDocument()

  })

  it("renders section with correct id", () => {

    render(
      <LazyRenderSection id="projects">
        <div>Projects Section</div>
      </LazyRenderSection>
    )

    const section = document.getElementById("projects")

    expect(section).toBeInTheDocument()

  })

})