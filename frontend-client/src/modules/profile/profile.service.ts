import { fallbackProfile } from "./profile.fallback"

// Simula delay de una llamada a la API
const delay = (ms: number = 50) => new Promise(res => setTimeout(res, ms))

// Simula llamada a la API para obtener el perfil del usuario
export const getProfile = async () => {
  await delay()
  return fallbackProfile
}