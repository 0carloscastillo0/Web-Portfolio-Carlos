import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi, describe, it, expect, beforeEach } from "vitest"
import Contact from "@/views/sections/contact/Contact"

// ================= MOCKS =================

// Mock translation
vi.mock("@/hooks/useTranslation", () => ({
    useTranslation: () => ({
        t: (key: string) => key
    })
}))

// Mock email service
const sendContactMessageMock = vi.fn()

vi.mock("@/modules/contactMessage/contactMessage.service", () => ({
    sendContactMessage: (data: any) => sendContactMessageMock(data)
}))

// Mock CustomToast (simplificado)
vi.mock("@/views/components/CustomToast", () => ({
    default: ({ message }: { message: string }) => <div>{message}</div>
}))

// ================= TESTS =================
describe("Contact", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("renders form fields", () => {
        render(<Contact />)

        expect(screen.getByPlaceholderText("contact.form.name")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("contact.form.email")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("contact.form.subject")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("contact.form.message")).toBeInTheDocument()
    })

    it("shows validation error if fields are empty", async () => {
        render(<Contact />)

        fireEvent.click(screen.getByRole("button"))

        expect(await screen.findByText("contact.error.required")).toBeInTheDocument()
    })

    it("shows invalid email error", async () => {
        render(<Contact />)

        fireEvent.change(screen.getByPlaceholderText("contact.form.name"), {
            target: { value: "Test" }
        })
        fireEvent.change(screen.getByPlaceholderText("contact.form.email"), {
            target: { value: "invalid-email" }
        })
        fireEvent.change(screen.getByPlaceholderText("contact.form.subject"), {
            target: { value: "Hello" }
        })

        const messageInput = screen.getByPlaceholderText("contact.form.message")
        fireEvent.change(messageInput, {
            target: { value: "Message" }
        })

        fireEvent.submit(screen.getByRole("form"))

        expect(await screen.findByText("contact.error.invalidEmail")).toBeInTheDocument()
    })

    it("submits form successfully", async () => {
        sendContactMessageMock.mockResolvedValueOnce({})

        render(<Contact />)

        fireEvent.change(screen.getByPlaceholderText("contact.form.name"), {
            target: { value: "Test" }
        })
        fireEvent.change(screen.getByPlaceholderText("contact.form.email"), {
            target: { value: "test@mail.com" }
        })
        fireEvent.change(screen.getByPlaceholderText("contact.form.subject"), {
            target: { value: "Hello" }
        })
        fireEvent.change(screen.getByPlaceholderText("contact.form.message"), {
            target: { value: "Message" }
        })

        fireEvent.click(screen.getByRole("button"))

        await waitFor(() => {
            expect(sendContactMessageMock).toHaveBeenCalled()
        })

        expect(await screen.findByText("contact.success")).toBeInTheDocument()
    })

    it("handles API error", async () => {
        sendContactMessageMock.mockRejectedValueOnce(new Error())

        render(<Contact />)

        fireEvent.change(screen.getByPlaceholderText("contact.form.name"), {
            target: { value: "Test" }
        })
        fireEvent.change(screen.getByPlaceholderText("contact.form.email"), {
            target: { value: "test@mail.com" }
        })
        fireEvent.change(screen.getByPlaceholderText("contact.form.subject"), {
            target: { value: "Hello" }
        })
        fireEvent.change(screen.getByPlaceholderText("contact.form.message"), {
            target: { value: "Message" }
        })

        fireEvent.click(screen.getByRole("button"))

        expect(await screen.findByText("contact.error.failed")).toBeInTheDocument()
    })

})