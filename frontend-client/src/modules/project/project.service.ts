import { fallbackProjects } from "./project.fallback"

// Simula delay de una llamada a la API
const delay = (ms: number = 50) => new Promise(res => setTimeout(res, ms))

// Simula llamadas a la API con datos de fallback
export const getProjects = async () => {
  await delay()
  return fallbackProjects
}

// Simula llamada a la API para obtener detalles de un proyecto por ID
export const getProjectById = async (id: string) => {
  await delay()
  const project = fallbackProjects.find(p => p.id === id)
  return project
}

// Simula llamada a la API para obtener imágenes de un proyecto por ID
export const getProjectImages = async (projectId: string) => {
  await delay()
  const project = fallbackProjects.find(p => p.id === projectId)
  return project?.projectImages
}