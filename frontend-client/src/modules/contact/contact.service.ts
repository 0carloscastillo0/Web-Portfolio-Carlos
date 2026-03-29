import { fallbackContacts } from "./contact.fallback"

// Simula delay de una llamada a la API
const delay = (ms: number = 50) => new Promise(res => setTimeout(res, ms))

// Simula llamada a la API para obtener contactos
export const getContacts = async () => {
  await delay()
  return fallbackContacts
}