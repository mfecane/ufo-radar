export function truncateText(d: string, maxLength: number) {
  if (d.length > maxLength) {
    d = d.substring(0, maxLength)
    const res = d.match(/(.*)\s\S+$/)
    return `${res?.[1] || d}...`
  }
  return d
}
