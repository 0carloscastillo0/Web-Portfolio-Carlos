import { usePortfolio } from "@/hooks/usePortfolio"
import { useTranslation } from "@/hooks/useTranslation"
import { formatDateRange as formatDate } from "@/utils/date"

function EducationContent() {
  const { t } = useTranslation()
  const { educations, loading } = usePortfolio()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-10">

      {/* ================= TITLE ================= */}
      <h3 className="text-subtitle text-accent font-bold text-center md:text-left">
        {t("about.education")}
      </h3>

      {/* ================= LIST ================= */}
      <div className="space-y-4">

        {educations.map((edu) => (
          <div
            key={edu.id}
            className="
              p-4 rounded-xl
              surface-secondary
              border border-soft
            "
          >
            {/* ================= DESKTOP ================= */}
            <div className="hidden md:grid grid-cols-[1fr_2fr_1fr] items-start gap-4">

              {/* PLACE */}
              <div className="text-body text-primary font-semibold">
                {edu.place}
              </div>

              {/* CENTER */}
              <div className="space-y-1">
                <p className="text-body text-primary font-semibold">
                  {edu.name}
                </p>
                <p className="text-secondary text-body">
                  {edu.description}
                </p>
              </div>

              {/* DATES */}
              <div className="text-right text-secondary text-body">
                {formatDate(edu.startDate, edu.endDate)}
              </div>

            </div>

            {/* ================= MOBILE ================= */}
            <div className="md:hidden space-y-1">

              <p className="text-body text-primary font-semibold">
                {edu.place}
              </p>

              <p className="text-secondary text-body">
                {formatDate(edu.startDate, edu.endDate)}
              </p>

              <p className="text-body text-primary font-semibold">
                {edu.name}
              </p>

              <p className="text-secondary text-body">
                {edu.description}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default EducationContent