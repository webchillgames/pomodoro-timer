export function generateTimeOptions(): number[] {
  return Array(2)
    .fill(null)
    .map((v, i) => (i + 1) * 25)
}

export function generateBreakOptions(): number[] {
  return Array(3)
    .fill(null)
    .map((v, i) => (i + 1) * 5)
}

export function generateSectionsOptions(): number[] {
  return Array(12)
    .fill(null)
    .map((v, i) => i + 1)
}
