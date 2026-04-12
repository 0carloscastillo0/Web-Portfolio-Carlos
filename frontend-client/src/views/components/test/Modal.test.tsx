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

    it("should restore body scroll on unmount", () => {
        const { unmount } = render(<Modal onClose={() => {}}>Content</Modal>)

        expect(document.body.style.overflow).toBe("hidden")

        unmount()

        expect(document.body.style.overflow).toBe("auto")
    })

    it("should update to mobile on resize", () => {
        const { rerender } = render(<Modal onClose={() => {}}>Content</Modal>)

        Object.defineProperty(window, "innerWidth", {
            writable: true,
            value: 500,
        })

        fireEvent(window, new Event("resize"))

        rerender(<Modal onClose={() => {}}>Content</Modal>)

        expect(screen.getByRole("dialog")).toBeInTheDocument()
    })

    it("should be visible on desktop", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            value: 1024,
        })

        render(<Modal onClose={() => {}}>Content</Modal>)

        const dialog = screen.getByRole("dialog")

        expect(dialog.className).toMatch(/opacity-100/)
    })

    it("should start dragging on touch", () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            value: 500,
        })

        render(<Modal onClose={() => {}}>Content</Modal>)

        const sheet = screen.getByRole("dialog").firstChild as HTMLElement

        fireEvent.touchStart(sheet, {
            touches: [{ clientY: 100 }],
        })

        fireEvent.touchMove(sheet, {
            touches: [{ clientY: 150 }],
        })

        fireEvent.touchEnd(sheet)

        expect(sheet).toBeInTheDocument()
    })

    it("should close when dragged beyond threshold", async () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            value: 500,
        })

        Object.defineProperty(window, "innerHeight", {
            writable: true,
            value: 1000,
        })

        const onClose = vi.fn()

        render(<Modal onClose={onClose}>Content</Modal>)

        // Simular drag
        const dialog = screen.getByRole("dialog")
        const sheet = dialog.children[1] as HTMLElement

        const content = sheet.querySelector(".overflow-y-auto") as HTMLElement

        // Mock scrollTop para evitar interferencias
        Object.defineProperty(content, "scrollTop", {
            value: 0,
            writable: true,
        })

        // Start dragging
        fireEvent.touchStart(sheet, {
            touches: [{ clientY: 0 }],
        })

        // Move beyond threshold (25% of 1000 = 250)
        fireEvent.touchMove(sheet, {
            touches: [{ clientY: 400 }],
        })

        fireEvent.touchEnd(sheet)

        await waitFor(() => {
            expect(onClose).toHaveBeenCalled()
        })
    })
})
