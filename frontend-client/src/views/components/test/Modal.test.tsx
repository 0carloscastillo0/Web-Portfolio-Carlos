import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import Modal from "../Modal"

// ================= MODAL TEST =================
describe("Modal", () => {

    it("should render modal content", () => {
        render(
            <Modal onClose={() => {}}>
            Modal Content
            </Modal>
        )

        expect(screen.getByRole("dialog")).toBeInTheDocument()
        expect(screen.getByText("Modal Content")).toBeInTheDocument()
    })

    it("should close when clicking backdrop", async () => {
        const onClose = vi.fn()

        render(
            <Modal onClose={onClose}>
            Content
            </Modal>
        )

        fireEvent.click(screen.getByTestId("modal-overlay"))

        await waitFor(() => {
            expect(onClose).toHaveBeenCalled()
        })
    })

    it("should close when clicking close button (desktop)", async () => {
        const onClose = vi.fn()

        render(
            <Modal onClose={onClose}>
            Content
            </Modal>
        )

        const closeBtn = screen.getByRole("button", { name: /close/i })

        fireEvent.click(closeBtn)

        await waitFor(() => {
            expect(onClose).toHaveBeenCalled()
        })
    })

    it("should close when pressing Escape", () => {
        const onClose = vi.fn()

        render(<Modal onClose={onClose}>Content</Modal>)

        fireEvent.keyDown(window, { key: "Escape" })

        expect(onClose).toHaveBeenCalled()
    })

    it("should close on Escape (async safe)", async () => {
        const onClose = vi.fn()
        render(<Modal onClose={onClose}>Content</Modal>)

        fireEvent.keyDown(window, { key: "Escape" })

        await waitFor(() => {
            expect(onClose).toHaveBeenCalled()
        })
    })

    it("should close with animation on desktop", () => {
        const onClose = vi.fn()

        render(<Modal onClose={onClose}>Content</Modal>)

        fireEvent.click(screen.getByLabelText(/close modal/i))

        expect(onClose).toHaveBeenCalled()
    })

    it("should handle mobile close behavior", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            value: 500,
        })

        const onClose = vi.fn()

        render(<Modal onClose={onClose}>Content</Modal>)

        fireEvent.click(screen.getByTestId("modal-overlay"))

        expect(onClose).toHaveBeenCalled()
    })
})
