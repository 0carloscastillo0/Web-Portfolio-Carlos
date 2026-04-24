import { useState } from "react"
import { usePortfolio } from "@/hooks/usePortfolio"
import { useTranslation } from "@/hooks/useTranslation"
import { skillIconMap } from "@/utils/ToolsIconMap"
import type { Skill } from "@/modules/portfolio.interface"

function SkillsContent() {
  const { t } = useTranslation()
  const { skills, loading } = usePortfolio()
  const [filter, setFilter] = useState<"ALL" | "Advanced" | "Intermediate" | "Basic">("ALL")

  if (loading) {
    return <div>Loading...</div>
  }

  const skillBorderStyles = {
    Advanced: "border-red-300",
    Intermediate: "border-yellow-300",
    Basic: "border-green-300",
  }

  const filterButtonStyles = {
    ALL: {
      base: "border-gray-400 text-gray-500",
      active: "bg-gray-500 text-white border-gray-500",
    },
    Advanced: {
      base: "border-red-400 text-red-500",
      active: "bg-red-500 text-white border-red-500",
    },
    Intermediate: {
      base: "border-yellow-400 text-yellow-500",
      active: "bg-yellow-500 text-white border-yellow-500",
    },
    Basic: {
      base: "border-green-400 text-green-500",
      active: "bg-green-500 text-white border-green-500",
    },
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

        {[
          { label: "All", value: "ALL" },
          { label: "Advanced", value: "Advanced" },
          { label: "Intermediate", value: "Intermediate" },
          { label: "Basic", value: "Basic" },
        ].map((btn) => {

          return (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value as any)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium
                border transition-all duration-200

                ${
                  filter === btn.value
                    ? filterButtonStyles[btn.value as keyof typeof filterButtonStyles].active
                    : filterButtonStyles[btn.value as keyof typeof filterButtonStyles].base
                }
              `}
            >
              {btn.label}
            </button>
          )
        })}

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
                      ${skillBorderStyles[skill.level as keyof typeof skillBorderStyles]}
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