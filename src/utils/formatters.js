export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function nowISODateTime() {
  const d = new Date()
  d.setSeconds(0, 0)
  return d.toISOString().slice(0, 16)
}

export function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatDateTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function formatTime(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function formatDuration(seconds) {
  const s = Number(seconds) || 0
  const m = Math.floor(s / 60)
  const rest = s % 60
  return `${m}min ${String(rest).padStart(2, '0')}s`
}

export function formatCurrency(amount, currency = '€') {
  const value = Number(amount) || 0
  const formatted = value.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  return currency === '€' ? `${formatted} €` : `${currency}${formatted}`
}

export function isToday(iso) {
  if (!iso) return false
  return iso.slice(0, 10) === todayISO()
}

export function isPastDateTime(iso) {
  if (!iso) return false
  return new Date(iso).getTime() < Date.now()
}

export function isWithinNextDays(iso, days) {
  if (!iso) return false
  const target = new Date(iso).getTime()
  const now = Date.now()
  return target >= now && target <= now + days * 24 * 60 * 60 * 1000
}

export function isWithinLastDays(iso, days) {
  if (!iso) return false
  const target = new Date(iso).getTime()
  const now = Date.now()
  return target <= now && target >= now - days * 24 * 60 * 60 * 1000
}

export function isThisMonth(iso) {
  if (!iso) return false
  const d = new Date(iso)
  const now = new Date()
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

// Buckets a list of ISO datetimes into N trailing weekly counts, oldest first.
export function weeklyBuckets(isoDates, weeks = 8) {
  const now = new Date()
  const buckets = []
  for (let i = weeks - 1; i >= 0; i--) {
    const end = new Date(now)
    end.setDate(end.getDate() - i * 7)
    const start = new Date(end)
    start.setDate(start.getDate() - 7)
    const count = isoDates.filter((iso) => {
      const t = new Date(iso).getTime()
      return t > start.getTime() && t <= end.getTime()
    }).length
    buckets.push({ label: `S-${i}`, count })
  }
  return buckets
}
