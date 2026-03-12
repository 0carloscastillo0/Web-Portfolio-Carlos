export function resolveData<T>(
  value: T | null | undefined,
  fallback: T
): T {
  return value ?? fallback
}

export function resolveArray<T>(
  value: T[] | null | undefined,
  fallback: T[]
): T[] {
  return value && value.length > 0 ? value : fallback
}