export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 10)
}

export function getScoreColor(score: number): string {
  if (score >= 75) return 'text-emerald-400'
  if (score >= 50) return 'text-yellow-400'
  return 'text-rose-400'
}

export function getScoreGradient(score: number): string {
  if (score >= 75) return 'bg-linear-to-r from-emerald-500 to-teal-500'
  if (score >= 50) return 'bg-linear-to-r from-yellow-500 to-orange-500'
  return 'bg-linear-to-r from-rose-500 to-pink-500'
}
