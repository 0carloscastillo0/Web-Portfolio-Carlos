import { usePortfolio } from "@/hooks/usePortfolio"
import { useTranslation } from "@/hooks/useTranslation"

function DescriptionContent() {
  const { t } = useTranslation()
  
  const { profile, loading } = usePortfolio()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-10">

      {/* ================= TITLE ================= */}
      <h3 className="text-subtitle text-accent font-bold text-center md:text-left">
        {t("about.description")}
      </h3>

      {/* ================= CONTENT ================= */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* ================= IMAGE ================= */}
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="relative">
            
            {/* Glow effect */}
            <div className="absolute w-52 h-52 md:w-64 md:h-64 rounded-full bg-accent/20 blur-3xl" />

            <img
              src={profile?.Urlphoto}
              alt={profile?.name}
              className="
                relative
                w-52 h-52 md:w-64 md:h-64
                max-w-md
                aspect-square
                rounded-4xl
                object-cover
                shadow-xl
              "
            />
          </div>

          <p className="text-body text-accent font-semibold text-center">
              {profile?.title}
          </p>

        </div>

        {/* ================= TEXT ================= */}
        <div className="space-y-6 text-center md:text-left">

          <p className="text-body text-secondary leading-relaxed">
            {profile?.description}
          </p>

        </div>

      </div>

    </div>
  )
}

export default DescriptionContent