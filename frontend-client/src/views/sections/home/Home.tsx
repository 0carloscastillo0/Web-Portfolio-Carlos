import { iconMap } from "@/utils/iconMap"
import { useTranslation } from "@/hooks/useTranslation"
import { usePortfolio } from "@/hooks/usePortfolio"

function Home() {

  const { t } = useTranslation()
  const { profile, socialLinks, loading } = usePortfolio()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <section
      className="min-h-[calc(100vh-80px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">

        <div className="grid md:grid-cols-2 gap-12 items-center h-full">

          {/* ================= TEXT SIDE ================= */}
          <div className="flex flex-col justify-center space-y-12 text-center md:text-left order-2 md:order-1">

            {/* TEXT BLOCK */}
            <div className="space-y-2">

              <p className="text-subtitle opacity-70">
                {t("home.greeting")}
              </p>

              <h1 className="text-title">
                {profile?.name} {profile?.lastname}
              </h1>

              <h2 className="text-subtitle text-accent font-semibold">
                {profile?.title}
              </h2>

            </div>


            {/* SOCIAL LINKS */}
            <div className="flex justify-center md:justify-start gap-5">

              {socialLinks.map((link) => {

                const Icon = iconMap[link.icon as keyof typeof iconMap]

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-secondary hover:scale-110 transition duration-200"
                    aria-label={link.name}
                  >
                    {Icon && <Icon size={28} />}
                  </a>
                )
              })}

            </div>


            {/* LOCATION */}
            <div className="flex items-center justify-center md:justify-start gap-2 opacity-70">

              <iconMap.MapPin size={18} />

              <span className="text-body">
                {profile?.city}, {profile?.country}
              </span>

            </div>

          </div>

          {/* ================= IMAGE SIDE ================= */}
          <div className="relative flex items-center justify-center md:justify-end order-1 md:order-2 mt-8 md:mt-0">

            <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-2xl bg-accent/20 blur-3xl" />

            <img
              src={profile?.Urlphoto}
              alt={profile?.name}
              className="relative w-72 h-72 md:w-96 md:h-96 rounded-4xl object-cover shadow-xl"
            />

          </div>

        </div>
      </div>
    </section>
  )
}

export default Home