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

        fireEvent.click(screen.getByRole("dialog"))

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
})
