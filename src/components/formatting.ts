export function formatTimerData(timer: number): string {
  const hours = Math.floor(timer / 3600)
  const min = Math.floor((timer - hours * 3600) / 60)
  const sec = timer - hours * 3600 - min * 60

  return `${addZero(hours)}:${addZero(min)}:${addZero(sec)}`
}

function addZero(num: number): string {
  return num.toString().padStart(2, '0')
}
