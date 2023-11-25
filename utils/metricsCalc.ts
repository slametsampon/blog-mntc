export function yearTargetCalc(data) {
  const currentDay = data.day
  const totalSD = data.schSdDay + data.uschSdDay
  data.oprDay = currentDay - totalSD
  data.oprHour = data.oprDay * 24

  return data
}

export function hourCalc(data, toDay) {
  const currentMonth = toDay.getMonth()
  const currentDate = toDay.getDate()
  let ytdDay = 0
  let ytdTargetDay = 0
  let ytdActualDay = 0
  let ytdActualHour = 0

  //Calculate day & hour
  if (currentMonth > 0) {
    for (let i = 0; i <= currentMonth; i++) {
      ytdDay += data.monthDay[i]
      ytdTargetDay += data.monthTargetDay[i]
      ytdActualDay += data.monthActualDay[i]
      ytdActualHour += data.monthActualHrs[i]
    }
    ytdDay += currentDate
    ytdTargetDay += currentDate
    ytdActualDay += currentDate
    const ytdHour = ytdDay * 24
    const ytdTargetHour = ytdTargetDay * 24
    //const ytdActualHour = ytdActualDay * 24

    data.ytdTarget.day = ytdDay
    data.ytdTarget.operationDay = ytdTargetDay
    data.ytdTarget.operationHour = ytdTargetHour

    data.ytdActual.day = ytdDay
    data.ytdActual.operationDay = ytdActualDay
    data.ytdActual.operationHour = ytdActualHour
  }

  data.currentMonthTarget.day = data.monthDay[currentMonth]
  data.currentMonthTarget.operationDay = data.monthTargetDay[currentMonth]
  data.currentMonthTarget.operationHour = data.currentMonthTarget.operationDay * 24

  data.currentMonthActual.day = data.monthDay[currentMonth]
  data.currentMonthActual.operationDay = currentDate
  data.currentMonthActual.operationHour = data.currentMonthActual.operationDay * 24
  data.currentMonthDayPercentage = Math.floor(
    (data.currentMonthActual.operationDay * 100) / data.currentMonthTarget.operationDay
  )

  data.currentMonthHourPercentage = Math.floor(
    (data.currentMonthActual.operationHour * 100) / data.currentMonthTarget.operationHour
  )

  data.ytdHourPercentage = Math.floor(
    (data.ytdActual.operationHour * 100) / data.ytdTarget.operationHour
  )

  data.ytdDayPercentage = Math.floor(
    (data.ytdActual.operationDay * 100) / data.ytdTarget.operationDay
  )
  //progone target calc
  data.prognoseTarget.day = data.currentYear.day
  data.prognoseTarget.operationDay = data.currentYear.oprDay
  data.prognoseTarget.operationHour = data.prognoseTarget.operationDay * 24

  //progone actual calc
  let remainingTargetDay = 0
  for (let i = currentMonth + 1; i <= 11; i++) {
    ytdDay += data.monthDay[i]
    remainingTargetDay += data.monthTargetDay[i]
  }
  const remainingTargetHour = remainingTargetDay * 24

  data.prognoseActual.day = data.currentYear.day
  data.prognoseActual.operationDay = data.ytdActual.operationDay - currentDate + remainingTargetDay
  data.prognoseActual.operationHour = data.ytdActual.operationHour + remainingTargetHour

  data.prognosePercentage = Math.floor(
    (data.prognoseActual.operationDay * 100) / data.prognoseTarget.operationDay
  )
  console.log('hourCalc - data : ', data)
  return data
}
