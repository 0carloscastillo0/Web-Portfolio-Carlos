import { render, screen, fireEvent } from "@testing-library/react"
import { vi, describe, it, expect } from "vitest"
import CustomToast from "@/views/components/CustomToast"

// Mock iconMap (evita errores de render)
vi.mock("@/utils/iconMap", () => ({
  iconMap: {
    close: () => <span>icon</span>
  }
}))

// ================= CUSTOM TOAST TEST =================
describe("CustomToast", () => {

    it("renders message correctly", () => {
        render(
            <CustomToast
                type="success"
                message="Test message"
                onClose={() => {}}
            />
        )

        expect(screen.getByText("Test message")).toBeInTheDocument()
    })

    it("applies success styles", () => {
        const { container } = render(
            <CustomToast
                type="success"
                message="Success"
                onClose={() => {}}
            />
        )

        expect(container.firstChild).toHaveClass("bg-green-600")
    })

    it("applies error styles", () => {
        const { container } = render(
            <CustomToast
                type="error"
                message="Error"
                onClose={() => {}}
            />
        )

        expect(container.firstChild).toHaveClass("bg-red-600")
    })

    it("calls onClose when clicking close button", () => {
        const onClose = vi.fn()

        render(
            <CustomToast
                type="success"
                message="Test"
                onClose={onClose}
            />
        )

        fireEvent.click(screen.getByRole("button"))

        expect(onClose).toHaveBeenCalled()
    })

    it("auto closes after duration", () => {
        vi.useFakeTimers()
        const onClose = vi.fn()

        render(
            <CustomToast
                type="success"
                message="Test"
                onClose={onClose}
                duration={4000}
            />
        )

        vi.advanceTimersByTime(4000)

        expect(onClose).toHaveBeenCalled()

        vi.useRealTimers()
    })

})