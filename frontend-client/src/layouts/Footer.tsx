import { useTranslation } from "../hooks/useTranslation"

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="surface-primary border-t border-soft">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm">
        ©2026 Castillo Sites. {t("footer.rights")}
      </div>
    </footer>
  )
}

export default Footer