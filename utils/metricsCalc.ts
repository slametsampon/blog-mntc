import { TCapex, TDisturbance, TOpex, TReliability, TReliabilityYear } from './definition'
import { getDayOfYear, getMonth, getMonthDays } from './getFormatedDate'

export function yearTargetCalc(yearData) {
  const yearTarget: TReliabilityYear = yearData
  const currentDay = yearTarget.day
  const totalSD = yearTarget.schSdDay + yearTarget.unschSdDay
  yearTarget.operationDay = currentDay - totalSD
  yearTarget.operationTargetHour = yearTarget.operationDay * 24

  return yearTarget
}

export function targetMonthCalc(year, planSDList) {
  const targetMonth: TReliability = {
    monthDay: [],
    monthTargetDay: [],
    percentageDay: [],
    monthTargetHrs: [],
    monthActualHrs: [],
    percentageHour: [],
  }
  const maxMonth = 12
  for (let i = 1; i <= maxMonth; i++) {
    targetMonth.monthDay.push(getMonthDays(year, i))
    targetMonth.monthTargetDay.push(getMonthDays(year, i))
    targetMonth.monthTargetHrs.push(getMonthDays(year, i) * 24)
  }

  //calculate target months
  planSDList.map((item) => {
    const month = parseFloat(getMonth(item.dateStr)) - 1
    targetMonth.monthTargetDay[month] = targetMonth.monthDay[month] - parseFloat(item.duration)
    targetMonth.monthTargetHrs[month] =
      targetMonth.monthTargetHrs[month] - parseFloat(item.duration) * 24
  })
  return targetMonth
}

export function targetYearCalc(year, planSDList) {
  let totalPlanSdDay = 0
  let totalSchedule = 0
  let totalUnschedule = 0
  planSDList.map((item) => {
    totalPlanSdDay += parseFloat(item.duration)
    if (item.description.includes('UNSCH-')) {
      totalUnschedule += parseFloat(item.duration)
    } else totalSchedule += parseFloat(item.duration)
  })

  const yearDay = getDayOfYear(year)
  const operationDay = yearDay - totalPlanSdDay
  const operationHour = operationDay * 24
  const targetYear: TReliabilityYear = {
    year: year,
    day: yearDay,
    unschSdDay: totalUnschedule,
    schSdDay: totalSchedule,
    totalPlanSdDay: totalPlanSdDay,
    operationDay: operationDay,
    operationActualHour: 0,
    operationPercentageHour: 0,
    operationTargetHour: operationHour,
  }
  return targetYear
}

export function disturbanceCalc(reliabilityData, disturbanceData) {
  const disturbanceInternal: TDisturbance[] = disturbanceData.internal
  const disturbanceExternal: TDisturbance[] = disturbanceData.external
  const MonthTargetDay: number[] = reliabilityData.monthTargetDay

  MonthTargetDay.forEach((element, index) => {
    reliabilityData.monthTargetHrs[index] = element * 24
  })

  //disturbance Internal
  let distInternal = 0
  disturbanceInternal.forEach((disturbance) => {
    const date = new Date(disturbance.dateStr)
    const month = date.getMonth()
    reliabilityData.monthActualHrs[month] =
      reliabilityData.monthTargetHrs[month] - disturbance.duration
    distInternal += disturbance.duration
  })
  //disturbance External
  let distExternal = 0
  disturbanceExternal.forEach((disturbance) => {
    const date = new Date(disturbance.dateStr)
    const month = date.getMonth()
    reliabilityData.monthActualHrs[month] =
      reliabilityData.monthActualHrs[month] - disturbance.duration
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
  const ytdMonth = currentMonth
  const prognoseMonth = currentMonth + 1

  const currentDate = toDay.getDate()
  const reliabilityCalcData: TReliability = reliabilityData
  const reliabilityYaer: TReliabilityYear = reliabilityData.currentYear

  let ytdDay = 0
  let ytdTargetDay = 0
  let ytdActualHour = 0

  //Calculate day & hour
  if (currentMonth > 0) {
    for (let i = 0; i < currentMonth; i++) {
      ytdDay += reliabilityCalcData.monthDay[i]
      ytdTargetDay += reliabilityCalcData.monthTargetDay[i]
      ytdActualHour += reliabilityCalcData.monthActualHrs[i]

      //calculate percentage
      reliabilityCalcData.percentageHour[i] = Math.floor(
        (reliabilityCalcData.monthActualHrs[i] * 100) / reliabilityCalcData.monthTargetHrs[i]
      )
    }
    const ytdTargetHour = ytdTargetDay * 24

    reliabilityCalcData.monthTargetHrs[ytdMonth] = ytdTargetHour //YTD target hour
    reliabilityCalcData.monthActualHrs[ytdMonth] = ytdActualHour
  }

  reliabilityCalcData.percentageHour[ytdMonth] = Math.floor(
    (reliabilityCalcData.monthActualHrs[ytdMonth] * 100) /
      reliabilityCalcData.monthTargetHrs[ytdMonth]
  )

  reliabilityCalcData.monthTargetHrs[prognoseMonth] = reliabilityYaer.operationDay * 24

  //progone actual calc
  let remainingTargetDay = 0
  for (let i = currentMonth + 1; i <= 11; i++) {
    ytdDay += reliabilityCalcData.monthDay[i]
    remainingTargetDay += reliabilityCalcData.monthTargetDay[i]
  }
  remainingTargetDay += reliabilityCalcData.monthTargetDay[currentMonth] - currentDate
  const remainingTargetHour = remainingTargetDay * 24

  reliabilityCalcData.monthActualHrs[prognoseMonth] =
    reliabilityCalcData.monthActualHrs[ytdMonth] + remainingTargetHour

  reliabilityCalcData.percentageHour[prognoseMonth] = Math.floor(
    (reliabilityCalcData.monthActualHrs[prognoseMonth] * 100) /
      reliabilityCalcData.monthTargetHrs[prognoseMonth]
  )

  // console.log('hourCalc - data : ', reliabilityData)
  return reliabilityCalcData
}

export function opexCalc(opexData, toDay) {
  const currentMonth = toDay.getMonth()
  const ytdMonth = currentMonth + 1
  const prognoseMonth = currentMonth + 2

  const opexCalcData: TOpex = opexData
  let ytdOpexBudget = 0
  let ytdOpexActual = 0
  let opexPrognoseBudget = 0
  let opexPrognoseActual = 0

  //Calculate ytd
  if (currentMonth >= 0) {
    for (let i = 0; i <= currentMonth; i++) {
      ytdOpexBudget += opexCalcData.monthBudget[i]
      ytdOpexActual += opexCalcData.monthActual[i]
      opexCalcData.percentage[i] = Math.floor(
        (opexCalcData.monthActual[i] * 100) / opexCalcData.monthBudget[i]
      )
    }

    opexCalcData.monthBudget[ytdMonth] = ytdOpexBudget
    opexCalcData.monthActual[ytdMonth] = ytdOpexActual
    opexCalcData.percentage[ytdMonth] = Math.floor(
      (opexCalcData.monthActual[ytdMonth] * 100) / opexCalcData.monthBudget[ytdMonth]
    )

    //init prognose
    opexPrognoseActual = ytdOpexActual
    opexPrognoseBudget = ytdOpexBudget
  }

  //Calculate prognose
  for (let i = ytdMonth; i <= 11; i++) {
    opexPrognoseActual += opexCalcData.monthBudget[i]
    opexPrognoseBudget += opexCalcData.monthBudget[i]
  }

  opexCalcData.monthBudget[prognoseMonth] = opexPrognoseBudget
  opexCalcData.monthActual[prognoseMonth] = opexPrognoseActual
  opexCalcData.percentage[prognoseMonth] = Math.floor(
    (opexCalcData.monthActual[prognoseMonth] * 100) / opexCalcData.monthBudget[prognoseMonth]
  )

  return opexCalcData
}

export function capexCalc(capexData, toDay) {
  const currentMonth = toDay.getMonth()
  const ytdMonth = currentMonth + 1
  const prognoseMonth = currentMonth + 2

  const capexCalcData: TCapex = capexData
  let ytdCapexBudget = 0
  let ytdCapexActual = 0
  let capexPrognoseBudget = 0
  let capexPrognoseActual = 0

  //Calculate ytd
  if (currentMonth >= 0) {
    for (let i = 0; i <= currentMonth; i++) {
      ytdCapexBudget += capexCalcData.monthBudget[i]
      ytdCapexActual += capexCalcData.monthActual[i]
      capexCalcData.percentage[i] = Math.floor(
        (capexCalcData.monthActual[i] * 100) / capexCalcData.monthBudget[i]
      )
    }

    capexCalcData.monthBudget[ytdMonth] = ytdCapexBudget
    capexCalcData.monthActual[ytdMonth] = ytdCapexActual
    capexCalcData.percentage[ytdMonth] = Math.floor(
      (capexCalcData.monthActual[ytdMonth] * 100) / capexCalcData.monthBudget[ytdMonth]
    )

    //init prognose
    capexPrognoseActual = ytdCapexActual
    capexPrognoseBudget = ytdCapexBudget
  }

  //Calculate prognose
  for (let i = ytdMonth; i <= 11; i++) {
    capexPrognoseActual += capexCalcData.monthBudget[i]
    capexPrognoseBudget += capexCalcData.monthBudget[i]
  }

  capexCalcData.monthBudget[prognoseMonth] = capexPrognoseBudget
  capexCalcData.monthActual[prognoseMonth] = capexPrognoseActual
  capexCalcData.percentage[prognoseMonth] = Math.floor(
    (capexCalcData.monthActual[prognoseMonth] * 100) / capexCalcData.monthBudget[prognoseMonth]
  )

  return capexCalcData
}
