import { Disturbance } from './definition'

export function yearTargetCalc(yearData) {
  const currentDay = yearData.day
  const totalSD = yearData.schSdDay + yearData.uschSdDay
  yearData.operationDay = currentDay - totalSD
  yearData.operationHour = yearData.operationDay * 24

  return yearData
}

export function disturbanceCalc(reliabilityData, disturbanceData) {
  const disturbanceInternal: Disturbance[] = disturbanceData.internal
  const disturbanceExternal: Disturbance[] = disturbanceData.external
  const MonthTargetDay: number[] = reliabilityData.monthTargetDay

  MonthTargetDay.forEach((element, index) => {
    reliabilityData.monthTargetHrs[index] = element * 24
  })

  //disturbance Internal
  let distInternal = 0
  disturbanceInternal.forEach((disturbance) => {
    const date = new Date(disturbance.date)
    const month = date.getMonth()
    reliabilityData.monthActualHrs[month] =
      reliabilityData.monthTargetHrs[month] - disturbance.duration
    distInternal += disturbance.duration
  })
  //disturbance External
  let distExternal = 0
  disturbanceExternal.forEach((disturbance) => {
    const date = new Date(disturbance.date)
    const month = date.getMonth()
    reliabilityData.monthActualHrs[month] =
      reliabilityData.monthTargetHrs[month] - disturbance.duration
    distExternal += disturbance.duration
  })
  const totalDisturbance = distInternal + distExternal
  disturbanceData.summary.internal = distInternal
  disturbanceData.summary.external = distExternal
  disturbanceData.summary.total = totalDisturbance

  // console.log('disturbanceData : ', disturbanceData)
  // console.log('reliabilityData : ', reliabilityData)
}

export function hourCalc(reliabilityData, toDay) {
  const currentMonth = toDay.getMonth()
  const currentDate = toDay.getDate()
  let ytdDay = 0
  let ytdTargetDay = 0
  let ytdActualHour = 0

  //Calculate day & hour
  if (currentMonth > 0) {
    for (let i = 0; i <= currentMonth; i++) {
      ytdDay += reliabilityData.monthDay[i]
      ytdTargetDay += reliabilityData.monthTargetDay[i]
      ytdActualHour += reliabilityData.monthActualHrs[i]
    }
    ytdDay += currentDate
    ytdTargetDay += currentDate
    const ytdTargetHour = ytdTargetDay * 24

    reliabilityData.ytdTarget.day = ytdDay
    reliabilityData.ytdTarget.operationDay = ytdTargetDay
    reliabilityData.ytdTarget.operationHour = ytdTargetHour

    reliabilityData.ytdActual.operationHour = ytdActualHour
  }

  reliabilityData.currentMonthTarget.day = reliabilityData.monthDay[currentMonth]
  reliabilityData.currentMonthTarget.operationDay = reliabilityData.monthTargetDay[currentMonth]
  reliabilityData.currentMonthTarget.operationHour =
    reliabilityData.currentMonthTarget.operationDay * 24

  reliabilityData.currentMonthActual.day = reliabilityData.monthDay[currentMonth]
  reliabilityData.currentMonthActual.operationDay = currentDate
  reliabilityData.currentMonthActual.operationHour =
    reliabilityData.currentMonthActual.operationDay * 24
  reliabilityData.percentage.currentMonthDay = Math.floor(
    (reliabilityData.currentMonthActual.operationDay * 100) /
      reliabilityData.currentMonthTarget.operationDay
  )

  reliabilityData.percentage.currentMonthHour = Math.floor(
    (reliabilityData.currentMonthActual.operationHour * 100) /
      reliabilityData.currentMonthTarget.operationHour
  )

  reliabilityData.percentage.ytdHour = Math.floor(
    (reliabilityData.ytdActual.operationHour * 100) / reliabilityData.ytdTarget.operationHour
  )

  reliabilityData.percentage.ytdDay = Math.floor(
    (reliabilityData.ytdActual.operationDay * 100) / reliabilityData.ytdTarget.operationDay
  )
  //progone target calc
  reliabilityData.prognoseTarget.day = reliabilityData.currentYear.day
  reliabilityData.prognoseTarget.operationDay = reliabilityData.currentYear.operationDay
  reliabilityData.prognoseTarget.operationHour = reliabilityData.prognoseTarget.operationDay * 24

  //progone actual calc
  let remainingTargetDay = 0
  for (let i = currentMonth + 1; i <= 11; i++) {
    ytdDay += reliabilityData.monthDay[i]
    remainingTargetDay +=
      reliabilityData.monthTargetDay[i] + (reliabilityData.monthTargetDay[i - 1] - currentDate)
  }
  const remainingTargetHour = remainingTargetDay * 24

  reliabilityData.prognoseActual.day = reliabilityData.currentYear.day
  reliabilityData.prognoseActual.operationHour =
    reliabilityData.ytdActual.operationHour + remainingTargetHour

  reliabilityData.percentage.prognoseHour = Math.floor(
    (reliabilityData.prognoseActual.operationHour * 100) /
      reliabilityData.prognoseTarget.operationHour
  )
  // console.log('hourCalc - data : ', reliabilityData)
  return reliabilityData
}
