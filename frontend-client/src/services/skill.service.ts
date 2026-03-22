import type { Skill } from "../types/portfolio.types"

export const getUserSkills = async (): Promise<Skill[]> => {

  return [
    {
      id: "1",
      name: "JavaScript",
      category: "Language",
      icon: "javascript"
    },
    {
      id: "2",
      name: "TypeScript",
      category: "Language",
      icon: "typescript"
    },
    {
      id: "3",
      name: "Python",
      category: "Language",
      icon: "python"
    },
    {
      id: "4",
      name: "HTML5",
      category: "Frontend",
      icon: "html5"
    },
    {
      id: "5",
      name: "CSS3",
      category: "Frontend",
      icon: "css3"
    },
    {
      id: "6",
      name: "React",
      category: "Frontend",
      icon: "react"
    },
    {
      id: "7",
      name: "BootStrap",
      category: "Frontend",
      icon: "bootstrap"
    },
    {
      id: "8",
      name: "Node.js",
      category: "Backend",
      icon: "node"
    },
    {
      id: "9",
      name: "NestJS",
      category: "Backend",
      icon: "nestjs"
    },
    {
      id: "10",
      name: "Django",
      category: "Backend",
      icon: "django"
    },
    {
      id: "11",
      name: "MySQL",
      category: "Databases",
      icon: "mysql"
    },
    {
      id: "12",
      name: "PostgreSQL",
      category: "Databases",
      icon: "postgresql"
    },
    {
      id: "13",
      name: "MongoDB",
      category: "Databases",
      icon: "mongodb"
    },
    {
      id: "14",
      name: "Git",
      category: "Devops/Tools",
      icon: "git"
    },
    {
      id: "15",
      name: "GitHub",
      category: "Devops/Tools",
      icon: "github"
    },
    {
      id: "16",
      name: "Linux",
      category: "Devops/Tools",
      icon: "linux"
    },
    {
      id: "17",
      name: "Docker",
      category: "Devops/Tools",
      icon: "docker"
    },
    {
      id: "18",
      name: "Figma",
      category: "Design",
      icon: "figma"
    },
  ]
}