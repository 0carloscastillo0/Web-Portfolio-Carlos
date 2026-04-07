import { describe, it, expect } from "vitest"

import {
  formatMonthYear,
  formatDateRange,
} from "@/utils/date"


/**
 * ================= DATE UTILS TEST =================
 */
describe("date.ts", () => {

    it("should format date to 'Mon YYYY'", () => {
        const result = formatMonthYear("2023-01-15 00:00:00.000")

        expect(result).toBe("Jan 2023")
    })

    it("should format date range with start and end", () => {
        const result = formatDateRange("2023-01-01 00:00:00.000", "2023-06-01 00:00:00.000")

        expect(result).toBe("Jan 2023 - Jun 2023")
    })

    it("should format date range with 'Present' when no end date", () => {
        const result = formatDateRange("2023-01-01 00:00:00.000")

        expect(result).toBe("Jan 2023 - Present")
    })

})
