import { fallbackEducations } from "./education.fallback"

const delay = (ms: number = 50) => new Promise(res => setTimeout(res, ms))

// Simula llamada a la API para obtener la lista de educaciones
export const getEducations = async () => {
  await delay()
  return fallbackEducations
}