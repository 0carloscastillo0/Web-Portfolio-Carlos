// Utility functions for date formatting
const safeDate = (date: string) => new Date(date.replace(" ", "T"))

// Formats a date string to "Mon YYYY" format (e.g., "Jan 2023")
export const formatMonthYear = (date: string) => {
  return safeDate(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // Jan, Feb, Mar...
  })
}

// Formats a date range to "Mon YYYY - Mon YYYY" or "Mon YYYY - Present" if end date is not provided
export const formatDateRange = (start: string, end?: string) => {
  return `${formatMonthYear(start)} - ${
    end ? formatMonthYear(end) : "Present"
  }`
}