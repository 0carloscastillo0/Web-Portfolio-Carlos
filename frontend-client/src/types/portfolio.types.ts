export type Profile = {
  id: string
  name: string
  role: string
  location: string
  photo: string
  description: string
}

export type Contact = {
  id: string
  name: string
  url: string
  icon: string
}

export type Skill = {
  id: string
  name: string
  category: string
  icon: string
}

export type Education = {
  id: string
  place: string
  name: string
  description: string
  startDate: string
  endDate: string
}

export type PortfolioData = {
  profile: Profile | null
  skills: Skill[]
  contacts: Contact[]
  educations: Education[]
}