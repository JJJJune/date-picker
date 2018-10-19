export function isValidDate(timestamp) {
  if (!timestamp) {
    return false
  }
  const a = timestamp.split('/')
  const date = new Date(a[2], a[1] - 1, a[0])
  if (isNaN(date.getTime())) {
    return false
  }
  return true
}
