export const fancyTimeFormat = (timeInSeconds) => {
  const time = parseInt(timeInSeconds, 10)

  var hours = Math.floor(time / 3600)
  var mins = Math.floor((time % 3600) / 60)
  var secs = time % 60

  // Output like "01:01" or "04:03:59" or "123:03:59"
  var result = ''

  if (hours > 0) {
    if (hours < 10) {
      hours = `0${hours}`
    }
    result += `${hours}:`
  }

  if (mins < 10) {
    mins = `0${mins}`
  }

  result += `${mins}:${(secs < 10 ? '0' : '')}`
  result += `${secs}`
  return result
}
