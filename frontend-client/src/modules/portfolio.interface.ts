export interface Profile {
  id: string
  name: string
  role: string
  location: string
  photo: string
  description: string
}

export interface Contact {
  id: string
  name: string
  url: string
  icon: string
}

export interface Skill {
  id: string
  name: string
  category: string
  icon: string
}

export interface Education {
  id: string
  place: string
  name: string
  description: string
  startDate: string
  endDate: string
}

export interface Project {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  skills: Skill[]
  coverImage: string
}

export interface ProjectImage {
  id: string
  url: string
  order: number
}

export interface PortfolioData {
  profile: Profile | null
  skills: Skill[]
  contacts: Contact[]
  educations: Education[]
  projects: Project[]
}