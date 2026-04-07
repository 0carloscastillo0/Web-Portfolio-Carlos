import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

import Slider from "../Slider"

// ================= SLIDER TEST =================
describe("Slider", () => {

    const items = ["A", "B", "C"]

    const renderItem = (item: string) => <div>{item}</div>

    it("should render first item", () => {
        render(<Slider items={items} renderItem={renderItem} />)

        expect(screen.getByText("A")).toBeInTheDocument()
    })

    it("should navigate with dots", () => {
        render(
            <Slider
            items={["A", "B", "C"]}
            renderItem={(item) => <div>{item}</div>}
            />
        )

        const dots = screen
            .getAllByRole("button")
            .filter(btn => btn.className.includes("w-2.5"))

        fireEvent.click(dots[1])

        expect(dots[1]).toHaveClass("bg-accent")
    })

    it("should render dots", () => {
        render(<Slider items={items} renderItem={renderItem} />)

        const dots = screen.getAllByRole("button")

        expect(dots.length).toBeGreaterThan(1)
    })

    it("should return null when no items", () => {
        const { container } = render(
            <Slider items={[]} renderItem={renderItem} />
        )

        expect(container.firstChild).toBeNull()
    })
})