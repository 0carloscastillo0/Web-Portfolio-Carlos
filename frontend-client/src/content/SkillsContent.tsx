import { usePortfolio } from "../hooks/usePortfolio"
import { skillIconMap } from "../utils/skillIconMap"
import type { Skill } from "../types/portfolio.types"

function SkillsContent() {
  const { skills, loading } = usePortfolio()

  if (loading) {
    return <div>Loading...</div>
  }

  // ================= GROUP BY CATEGORY =================
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <div className="space-y-10">

      {/* ================= TITLE ================= */}
      <h3 className="text-subtitle text-accent font-bold text-center md:text-left">
        Skills
      </h3>

      {/* ================= GROUPS ================= */}
      <div className="space-y-8">

        {(Object.entries(groupedSkills) as [string, Skill[]][]).map(([category, skills]) => (
          <div key={category} className="space-y-4">

            {/* CATEGORY */}
            <h4 className="text-body font-semibold text-primary">
              {category}
            </h4>

            {/* SKILLS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

              {skills.map((skill: any) => {
                const Icon =
                  skillIconMap[
                    skill.icon as keyof typeof skillIconMap
                  ]

                return (
                  <div
                    key={skill.id}
                    className="
                      flex flex-col items-center justify-center
                      p-4 rounded-xl
                      surface-secondary
                      border border-soft
                    "
                  >
                    {/* ICON */}
                    {Icon ? (
                      <Icon size={28} className="text-primary opacity-90" />
                    ) : (
                      <div className="w-7 h-7 bg-secondary rounded" />
                    )}

                    {/* NAME */}
                    <span className="text-small mt-2 text-center">
                      {skill.name}
                    </span>
                  </div>
                )
              })}

            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default SkillsContent