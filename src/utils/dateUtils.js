const MOIS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

export function daysFromNow(offset) {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + offset)
  return d
}

export function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function toFR(date) {
  return `${date.getDate()} ${MOIS_FR[date.getMonth()]} ${date.getFullYear()}`
}

export function toFRShort(date) {
  return `${date.getDate()} ${MOIS_FR[date.getMonth()]}`
}

export function toFRRange(startDate, endDate) {
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.getDate()} — ${endDate.getDate()} ${MOIS_FR[startDate.getMonth()]} ${startDate.getFullYear()}`
  }
  return `${startDate.getDate()} ${MOIS_FR[startDate.getMonth()]} — ${endDate.getDate()} ${MOIS_FR[endDate.getMonth()]} ${endDate.getFullYear()}`
}

export function toFRRangeDash(startDate, endDate) {
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.getDate()} – ${endDate.getDate()} ${MOIS_FR[startDate.getMonth()]} ${startDate.getFullYear()}`
  }
  return `${startDate.getDate()} ${MOIS_FR[startDate.getMonth()]} – ${endDate.getDate()} ${MOIS_FR[endDate.getMonth()]} ${endDate.getFullYear()}`
}
