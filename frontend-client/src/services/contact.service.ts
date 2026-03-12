import type { Contact } from "../types/portfolio.types"

export const getContacts = async (): Promise<Contact[]> => {

  return [
    {
      id: "1",
      name: "email",
      url: "mailto:carlos@email.com",
      icon: "mail"
    },
    {
      id: "2",
      name: "linkedin",
      url: "https://linkedin.com",
      icon: "linkedin"
    },
    {
      id: "3",
      name: "github",
      url: "https://github.com",
      icon: "github"
    }
  ]
}