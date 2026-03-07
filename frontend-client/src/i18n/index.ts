import en from "./en"
import es from "./es"

export const translations = {
  EN: en,
  ES: es,
}

export type Language = keyof typeof translations