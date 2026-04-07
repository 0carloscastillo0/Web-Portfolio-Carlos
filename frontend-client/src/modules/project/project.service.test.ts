import { describe, it, expect } from "vitest"
import {
  getProjects,
  getProjectById,
  getProjectImages,
} from "./project.service"
import { fallbackProjects } from "./project.fallback"

describe("project.service", () => {
  it("should return all projects", async () => {
    const projects = await getProjects()

    expect(projects).toBeDefined()
    expect(Array.isArray(projects)).toBe(true)
    expect(projects).toEqual(fallbackProjects)
  })

  it("should return a project by id", async () => {
    const project = fallbackProjects[0]
    const result = await getProjectById(project.id)

    expect(result).toBeDefined()
    expect(result).toEqual(project)
  })

  it("should return undefined if project id does not exist", async () => {
    const result = await getProjectById("invalid-id")

    expect(result).toBeUndefined()
  })

  it("should return project images", async () => {
    const project = fallbackProjects[0]
    const images = await getProjectImages(project.id)

    expect(images).toEqual(project.projectImages)
  })

  it("should return undefined images if project does not exist", async () => {
    const images = await getProjectImages("invalid-id")

    expect(images).toBeUndefined()
  })
})