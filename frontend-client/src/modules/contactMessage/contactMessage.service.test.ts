import { describe, it, expect, vi, beforeEach } from "vitest"
import { sendContactMessage } from "./contactMessage.service"

// Mock bien definido
vi.mock("@emailjs/browser", () => {
  return {
    default: {
      send: vi.fn()
    }
  }
})

// Obtener referencia al mock DESPUÉS
import emailjs from "@emailjs/browser"

// ================= TESTS =================
describe("sendContactMessage", () => {

    beforeEach(() => {
        vi.clearAllMocks()

        import.meta.env.VITE_EMAILJS_SERVICE_ID = "service_id"
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID = "template_id"
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY = "public_key"
        import.meta.env.VITE_EMAIL_TO = "to@test.com"
    })

    it("should call emailjs.send with correct parameters", async () => {

        const data = {
            name: "Carlos",
            email: "carlos@test.com",
            subject: "Test Subject",
            message: "Test Message"
        }

        // Casteo para acceder al mock
        const sendMock = (emailjs.send as unknown as ReturnType<typeof vi.fn>)
        sendMock.mockResolvedValueOnce({ status: 200 })

        await sendContactMessage(data)

        expect(sendMock).toHaveBeenCalledWith(
            "service_id",
            "template_id",
            {
                to_email: "to@test.com",
                name: "Carlos",
                from_email: "carlos@test.com",
                subject: "Test Subject",
                message: "Test Message"
            },
            "public_key"
        )
    })

    it("should propagate errors if emailjs fails", async () => {
        const sendMock = (emailjs.send as unknown as ReturnType<typeof vi.fn>)
        sendMock.mockRejectedValueOnce(new Error("Email failed"))

        const data = {
            name: "Carlos",
            email: "carlos@test.com",
            subject: "Test",
            message: "Message"
        }

        await expect(sendContactMessage(data)).rejects.toThrow("Email failed")
    })

})