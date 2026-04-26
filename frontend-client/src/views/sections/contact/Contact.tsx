// ================= IMPORTS =================
import { useState } from "react"
import { useTranslation } from "@/hooks/useTranslation"
import type { ContactMessage } from "@/modules/portfolio.interface"
import { sendContactMessage } from "@/modules/contactMessage/contactMessage.service"
import CustomToast from "@/views/components/CustomToast"

const SUBJECT_LIMIT = 50
const MESSAGE_LIMIT = 500

// Contact section with form and notifications
function Contact() {

  // Translation, form state, loading state, and notification state
  const { t } = useTranslation()
  const [form, setForm] = useState<ContactMessage>({
      name: "",
      email: "",
      subject: "",
      message: ""
  })
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)


  // Handle form input changes
  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
      const { name, value } = e.target
      setForm(prev => ({ ...prev, [name]: value }))
  }

  // Validate form fields before submission
  const validate = () => {

    // Validate required fields
    if (!form.name || !form.email || !form.subject || !form.message) {
      return t("contact.error.required")
    }

    // Validate email format
    const email = form.email.trim()
    const parts = email.split("@")
    if (parts.length !== 2) {
      return t("contact.error.invalidEmail")
    }

    const [local, domain] = parts
    if (!local || !domain) {
      return t("contact.error.invalidEmail")
    }
    if (!domain.includes(".")) {
      return t("contact.error.invalidEmail")
    }
    if (
      domain.startsWith(".") ||
      domain.endsWith(".")
    ) {
      return t("contact.error.invalidEmail")
    }

    return null
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const error = validate()
    if (error) {
        setNotification({ type: "error", message: error })
        return
    }

    try {
        setLoading(true)

        await sendContactMessage(form)

        setNotification({
            type: "success",
            message: t("contact.success")
        })

        setForm({
            name: "",
            email: "",
            subject: "",
            message: ""
        })

    } catch {
        setNotification({
            type: "error",
            message: t("contact.error.failed")
        })
    } finally {
        setLoading(false)
    }
  }
  
  // ================= RENDER =================
  return (
    <section id="contact" className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full py-16">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            {t("contact.title")}
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-body text-secondary">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          role="form"
          noValidate
          className="max-w-xl mx-auto space-y-4"
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder={t("contact.form.name")}
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-soft bg-surface text-primary placeholder:text-secondary placeholder:opacity-100 focus:outline-none focus:ring-2"
          />

          {/* EMAIL */}
          <input
            type="text"
            name="email"
            placeholder={t("contact.form.email")}
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-soft bg-surface text-primary placeholder:text-secondary placeholder:opacity-100 focus:outline-none focus:ring-2"
          />

          {/* SUBJECT */}
          <div>
            <input
              type="text"
              name="subject"
              maxLength={SUBJECT_LIMIT}
              placeholder={t("contact.form.subject")}
              value={form.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-soft bg-surface text-primary placeholder:text-secondary placeholder:opacity-100 focus:outline-none focus:ring-2"
            />
            <p className="text-xs text-right text-secondary mt-1">
              {form.subject.length}/{SUBJECT_LIMIT}
            </p>
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              name="message"
              maxLength={MESSAGE_LIMIT}
              placeholder={t("contact.form.message")}
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 rounded-xl border border-soft bg-surface text-primary placeholder:text-secondary placeholder:opacity-100 focus:outline-none focus:ring-2"
            />
            <p className="text-xs text-right text-secondary mt-1">
              {form.message.length}/{MESSAGE_LIMIT}
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center text-sm px-6 py-3 border border-button rounded-xl hover:bg-secondary transition disabled:opacity-50 mx-auto"
          >
            {loading
              ? t("contact.sending")
              : t("contact.form.submit")}
          </button>
        </form>

        {/* ================= NOTIFICATION ================= */}
        {notification && (
          <CustomToast
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

      </div>
    </section>
  )
}

export default Contact