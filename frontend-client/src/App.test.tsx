import { render, screen, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"

import App from "./App"

/* =====================================================
    MOCKS
===================================================== */

vi.mock("./views/layouts/header/Header", () => ({
  default: () => <div>Header</div>,
}))

vi.mock("./views/layouts/footer/Footer", () => ({
  default: () => <div>Footer</div>,
}))

vi.mock("./views/sections/home/Home", () => ({
  default: () => <div>Home Section</div>,
}))

vi.mock("./views/sections/about/About", () => ({
  default: () => <div>About Section</div>,
}))

vi.mock("./views/sections/projects/Projects", () => ({
  default: () => <div>Projects Section</div>,
}))

vi.mock("./views/sections/contact/Contact", () => ({
  default: () => <div>Contact Section</div>,
}))

vi.mock("./views/components/LazyRenderSection", () => ({
  default: ({
    children,
    id,
  }: {
    children: React.ReactNode
    id: string
  }) => (
    <section data-testid={`section-${id}`}>
      {children}
    </section>
  ),
}))

vi.mock("./views/components/AppLoader", () => ({
  default: () => (
    <div role="status">
      Loading
    </div>
  ),
}))

vi.mock("./contexts/PortfolioContext", () => ({
  PortfolioProvider: ({
    children,
  }: {
    children: React.ReactNode
  }) => <>{children}</>,
}))

/* =====================================================
    TEST SETUP
===================================================== */

beforeEach(() => {

  Object.defineProperty(document, "images", {
    writable: true,
    value: [
      {
        complete: true,
      },
    ],
  })

})

/* =====================================================
    TESTS
===================================================== */

describe("App", () => {

  it("renders app loader initially", () => {

    render(<App />)

    expect(
      screen.getByRole("status")
    ).toBeInTheDocument()

  })

  it("renders all main sections after loading", async () => {

    render(<App />)

    await waitFor(() => {

      expect(
        screen.getByText("Header")
      ).toBeInTheDocument()

      expect(
        screen.getByText("Footer")
      ).toBeInTheDocument()

      expect(
        screen.getByText("Home Section")
      ).toBeInTheDocument()

      expect(
        screen.getByText("About Section")
      ).toBeInTheDocument()

      expect(
        screen.getByText("Projects Section")
      ).toBeInTheDocument()

      expect(
        screen.getByText("Contact Section")
      ).toBeInTheDocument()

    })

  })

  it("renders lazy render sections with correct ids", async () => {

    render(<App />)

    await waitFor(() => {

      expect(
        screen.getByTestId("section-home")
      ).toBeInTheDocument()

      expect(
        screen.getByTestId("section-about")
      ).toBeInTheDocument()

      expect(
        screen.getByTestId("section-projects")
      ).toBeInTheDocument()

      expect(
        screen.getByTestId("section-contact")
      ).toBeInTheDocument()

    })

  })

  it("hides loader after app finishes loading", async () => {

    render(<App />)

    await waitFor(() => {

      expect(
        screen.queryByRole("status")
      ).not.toBeInTheDocument()

    })

  })

})