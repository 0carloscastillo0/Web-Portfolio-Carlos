import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

import Card from "../Card"

// ================= CARD TEST =================
describe("Card", () => {

    it("should render children", () => {
        render(<Card>Content</Card>)

        expect(screen.getByText("Content")).toBeInTheDocument()
    })

    it("should handle click", () => {
        const onClick = vi.fn()

        render(<Card onClick={onClick}>Click me</Card>)

        fireEvent.click(screen.getByText("Click me"))

        expect(onClick).toHaveBeenCalled()
    })

    it("should trigger click with keyboard", () => {
        const onClick = vi.fn()

        render(<Card onClick={onClick}>Key test</Card>)

        const card = screen.getByRole("button")

        fireEvent.keyDown(card, { key: "Enter" })

        expect(onClick).toHaveBeenCalled()
    })
})

