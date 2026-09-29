const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function parse(ym: string): [number, number] {
  const [y, m] = ym.split('-').map(Number)
  return [y, m]
}

/** Inclusive month count between two YYYY-MM values (end = null means now), LinkedIn-style. */
export function monthsBetween(start: string, end: string | null): number {
  const [sy, sm] = parse(start)
  const now = new Date()
  const [ey, em] = end ? parse(end) : [now.getFullYear(), now.getMonth() + 1]
  return (ey - sy) * 12 + (em - sm) + 1
}

export function formatDuration(start: string, end: string | null): string {
  const months = monthsBetween(start, end)
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts: string[] = []
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`)
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`)
  return parts.join(' ')
}

export function formatMonth(ym: string): string {
  const [y, m] = parse(ym)
  return `${MONTHS[m - 1]} ${y}`
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}
