export interface Profile {
  id: string
  name: string
  lastname: string
  email: string
  title: string
  city: string
  country: string
  description: string
  UrlCVEN: string
  UrlCVES: string
  Urlphoto: string
}

export interface SocialLink {
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
  level: string
}

export interface Education {
  id: string
  place: string
  name: string
  description: string
  startDate: string
  endDate: string
}

export interface ProjectImage {
  id: string
  url: string
  order: number
}

export interface Project {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  skills: Skill[]
  coverImage: string
  projectImages: ProjectImage[]
}

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

export interface PortfolioData {
  profile: Profile | null
  skills: Skill[]
  socialLinks: SocialLink[]
  educations: Education[]
  projects: Project[]
}