import { useState } from "react"
import { usePortfolio } from "@/hooks/usePortfolio"
import { useTranslation } from "@/hooks/useTranslation"
import { skillIconMap } from "@/utils/ToolsIconMap"
import type { Skill } from "@/modules/portfolio.interface"

// ================= FILTER OPTIONS =================
const LEVEL_CONFIG = {
  ALL: {
    label: "All",
    button: {
      base: "border-button text-secondary",
      active: "bg-secondary text-primary border-button",
    }
  },
  Advanced: {
    label: "Advanced",
    button: {
      base: "border-advanced text-advanced",
      active: "bg-advanced text-white border-advanced",
    },
    skill: {
      border: "border-advanced",
    },
  },
  Intermediate: {
    label: "Intermediate",
    button: {
      base: "border-intermediate text-intermediate",
      active: "bg-intermediate text-white border-intermediate",
    },
    skill: {
      border: "border-intermediate",
    },
  },
  Basic: {
    label: "Basic",
    button: {
      base: "border-basic text-basic",
      active: "bg-basic text-white border-basic",
    },
    skill: {
      border: "border-basic",
    },
  },
} as const


// ================= SKILLS CONTENT COMPONENT =================
function SkillsContent() {
  const { t } = useTranslation()
  const { skills, loading } = usePortfolio()
  
  type LevelFilter = keyof typeof LEVEL_CONFIG
  const [filter, setFilter] = useState<LevelFilter>("ALL")

  if (loading) {
    return <div>Loading...</div>
  }

  // ================= FILTER AND GROUP BY CATEGORY =================
  const filteredSkills =
    filter === "ALL"
      ? skills
      : skills.filter((skill: Skill) => skill.level === filter)

  const groupedSkills = filteredSkills.reduce((acc: any, skill: Skill) => {
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
        {t("about.skills")}
      </h3>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="flex flex-wrap gap-2 justify-center">

        {Object.entries(LEVEL_CONFIG).map(([value, config]) => (
          <button
            key={value}
            aria-pressed={filter === value}
            onClick={() => setFilter(value as LevelFilter)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium
              border transition-all duration-200
              ${
                filter === value
                  ? config.button.active
                  : config.button.base
              }
            `}
          >
            {config.label}
          </button>
        ))}

      </div>

      {/* ================= GROUPS ================= */}
      <div className="space-y-8">

        {(Object.entries(groupedSkills) as [string, Skill[]][]).filter(([, skills]) => skills.length > 0).map(([category, skills]) => (
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
                    className={`
                      flex flex-col items-center justify-center
                      p-4 rounded-xl
                      surface-secondary
                      border
                      ${LEVEL_CONFIG[skill.level as Exclude<LevelFilter, "ALL">].skill.border}
                    `}
                  >
                    {/* ICON */}
                    {Icon ? (
                      <Icon size={28} className="text-primary opacity-90" />
                    ) : (
                      <div className="w-7 h-7 bg-secondary rounded" />
                    )}

                    {/* NAME */}
                    <span className="text-body mt-2 text-center">
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