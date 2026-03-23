import type { Project } from "../types/portfolio.types"

export const fallbackProjects: Project[] = [
  {
    id: "1",
    title: "Designing Dashboards",
    description: "Dashboard UI project",
    startDate: "2020-01-01",
    endDate: "2021-01-01",
    coverImage: "https://via.placeholder.com/400x300",
    skills: [
      { id: "1", name: "React", category: "Frontend", icon: "react" },
      { id: "2", name: "Node", category: "Backend", icon: "node" }
    ]
  }
]