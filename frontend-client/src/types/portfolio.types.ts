export type Profile = {
  id: string
  name: string
  role: string
  location: string
  photo: string
}

export type Contact = {
  id: string
  name: string
  url: string
  icon: string
}

export type PortfolioData = {
  profile: Profile | null
  contacts: Contact[]
}