import emailjs from "@emailjs/browser"
import type { ContactMessage } from "../portfolio.interface"

/// Enviar un mensaje de contacto utilizando EmailJS
export const sendContactMessage = async (data: ContactMessage) => {
    return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        {
            to_email: import.meta.env.VITE_EMAIL_TO,
            name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
    )
}