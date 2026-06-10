import { render, screen, fireEvent } from "@testing-library/react"
import DownloadCVModal from "../DownloadCVModal"
import { beforeEach, describe, expect, it, vi } from "vitest"

const mockT = (key: string) => key

// ================= DOWNLOAD CV MODAL TEST =================
describe("DownloadCVModal", () => {

    // Default props for tests
    const defaultProps = {
        onClose: vi.fn(),
        urlES: "/cv-es.pdf",
        urlEN: "/cv-en.pdf",
        t: mockT,
    }

    // Clear mocks before each test
    beforeEach(() => {
        vi.clearAllMocks()
    })

    // ============================
    // Test cases
    // ============================
    
    it("should render modal content", () => {
        render(<DownloadCVModal {...defaultProps} />)

        expect(screen.getByTestId("cv-modal")).toBeInTheDocument()
        expect(screen.getByText("cv.selectLanguage")).toBeInTheDocument()
    })

    it("should render both download links", () => {
        render(<DownloadCVModal {...defaultProps} />)

        expect(screen.getByText("cv.spanish")).toBeInTheDocument()
        expect(screen.getByText("cv.english")).toBeInTheDocument()
    })

    it("should render only Spanish link if EN url is missing", () => {
        render(
            <DownloadCVModal
                {...defaultProps}
                urlEN={undefined}
            />
        )

        expect(screen.getByText("cv.spanish")).toBeInTheDocument()
        expect(screen.queryByText("cv.english")).not.toBeInTheDocument()
    })

    it("should render only English link if ES url is missing", () => {
        render(
            <DownloadCVModal
                {...defaultProps}
                urlES={undefined}
            />
        )

        expect(screen.getByText("cv.english")).toBeInTheDocument()
        expect(screen.queryByText("cv.spanish")).not.toBeInTheDocument()
    })

    it("should call onClose when clicking Spanish download", () => {
        render(<DownloadCVModal {...defaultProps} />)

        fireEvent.click(screen.getByText("cv.spanish"))

        expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it("should call onClose when clicking English download", () => {
        render(<DownloadCVModal {...defaultProps} />)

        fireEvent.click(screen.getByText("cv.english"))

        expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })
})