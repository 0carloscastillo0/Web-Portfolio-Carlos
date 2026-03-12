import type { Profile } from "../types/portfolio.types"

export const getProfile = async (): Promise<Profile> => {

  return {
    id: "1",
    name: "Carlos Castillo",
    role: "Software Engineer",
    location: "Santiago, Chile",
    photo: "/vite.svg"
  }

}