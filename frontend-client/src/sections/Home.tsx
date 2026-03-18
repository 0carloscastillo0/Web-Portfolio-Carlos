import { iconMap } from "../utils/iconMap"
import { useTranslation } from "../hooks/useTranslation"
import { usePortfolio } from "../hooks/usePortfolio"

function Home() {

  const { t } = useTranslation()
  const { profile, contacts, loading } = usePortfolio()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-80px)] flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center h-full">

          {/* ================= TEXT SIDE ================= */}
          <div className="flex flex-col justify-center space-y-12 text-center md:text-left order-2 md:order-1">

            {/* TEXT BLOCK */}
            <div className="space-y-2">

              <p className="text-subtitle opacity-70">
                {t("home.greeting")}
              </p>

              <h1 className="text-title">
                {profile?.name}
              </h1>

              <h2 className="text-subtitle text-accent font-semibold">
                {profile?.role}
              </h2>

            </div>


            {/* SOCIAL LINKS */}
            <div className="flex justify-center md:justify-start gap-5">

              {contacts.map((contact) => {

                const Icon = iconMap[contact.icon as keyof typeof iconMap]

                return (
                  <a
                    key={contact.id}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-secondary hover:scale-110 transition duration-200"
                    aria-label={contact.name}
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
                {profile?.location}
              </span>

            </div>

          </div>

          {/* ================= IMAGE SIDE ================= */}
          <div className="relative flex items-center justify-center md:justify-end order-1 md:order-2">

            <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full bg-accent/20 blur-3xl" />

            <img
              src={profile?.photo}
              alt={profile?.name}
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover shadow-xl"
            />

          </div>

        </div>
      </div>
    </section>
  )
}

export default Home