import { fallbackSocialLink } from "./socialLink.fallback"

// Simula delay de una llamada a la API
const delay = (ms: number = 50) => new Promise(res => setTimeout(res, ms))

// Simula llamada a la API para obtener enlaces de redes sociales
export const getSocialLinks = async () => {
  await delay()
  return fallbackSocialLink
}