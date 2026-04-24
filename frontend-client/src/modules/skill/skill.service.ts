import { fallbackSkills } from "./skill.fallback"

// Simula delay de una llamada a la API
const delay = (ms: number = 50) => new Promise(res => setTimeout(res, ms))

// Simula llamada a la API para obtener la lista de habilidades del usuario
export const getUserSkills = async () => {
  
  await delay()
  return fallbackSkills
  
}