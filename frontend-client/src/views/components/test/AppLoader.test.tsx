import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

import AppLoader from "../AppLoader"

describe("AppLoader", () => {

    // Test to check if the loading text is rendered
    it("renders loading text", () => {
        render(<AppLoader />)

        expect(
            screen.getByText(/loading/i)
        ).toBeInTheDocument()

    })

    // Test to check if the spinner element is rendered
    it("renders spinner element", () => {
        const { container } = render(<AppLoader />)
        const spinner = container.querySelector(".animate-spin")

        expect(spinner).toBeInTheDocument()

    })

})