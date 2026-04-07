import { describe, it, expect } from "vitest"

import {
  resolveData,
  resolveArray,
} from "@/utils/resolveData"


  /**
   * ================= RESOLVE UTILS TEST =================
   */
describe("resolveDate.ts", () => {

    it("should return value when not null or undefined", () => {
      const result = resolveData("value", "fallback")

      expect(result).toBe("value")
    })

    it("should return fallback when value is null", () => {
      const result = resolveData(null, "fallback")

      expect(result).toBe("fallback")
    })

    it("should return fallback when value is undefined", () => {
      const result = resolveData(undefined, "fallback")

      expect(result).toBe("fallback")
    })

    it("should return array when it has elements", () => {
      const result = resolveArray([1, 2, 3], [9])

      expect(result).toEqual([1, 2, 3])
    })

    it("should return fallback when array is empty", () => {
      const result = resolveArray([], [9])

      expect(result).toEqual([9])
    })

    it("should return fallback when array is null", () => {
      const result = resolveArray(null, [9])

      expect(result).toEqual([9])
    })

    it("should return fallback when array is undefined", () => {
      const result = resolveArray(undefined, [9])

      expect(result).toEqual([9])
    })

})

