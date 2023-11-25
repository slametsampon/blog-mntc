import getMonthString from '@/utils/getMonthString'
import { hourCalc, yearTargetCalc } from '@/utils/metricsCalc'

export default function CardReliability({ title, data }) {
  const toDay = new Date()

  const currentYearData = data.currentYear
  const calcData = yearTargetCalc(currentYearData)

  const hourCalcData = hourCalc(data, toDay)
  return (
    <>
      <div className="mt-3 mb-3 rounded-xl bg-green-100  px-5 py-3 shadow-md dark:bg-gray-900">
        <div className="text-xl mb-3 text-blue-600 dark:text-gray-100 font-semibold">{title}</div>
        {/* Current year data */}
        <table className="table-auto ml-3 mb-3 border-2 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
          <caption className="font-semibold pb-1 text-left">Target</caption>
          <tbody>
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">Day</td>
              <td className="text-right px-3 font-semibold">{currentYearData.day}</td>
            </tr>
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">Schedule S/D</td>
              <td className="text-right px-3 font-semibold">{currentYearData.schSdDay}</td>
            </tr>
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">Un-Schedule S/D</td>
              <td className="text-right px-3 font-semibold">{currentYearData.uschSdDay}</td>
            </tr>
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">Operation Day</td>
              <td className="text-right px-3 font-semibold">{calcData.oprDay}</td>
            </tr>
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">Operation Hour</td>
              <td className="text-right px-3 font-semibold">{calcData.oprHour}</td>
            </tr>
          </tbody>
        </table>
        {/* Current month */}
        <table className="table-auto ml-3 mb-3 border-2 mt-8 dark:bg-gray-900 dark:text-gray-50 bg-green-50 rounded-2xl shadow-2xl">
          <caption className="font-semibold pb-1 text-left">{`Current Month : ${getMonthString(
            toDay
          )}`}</caption>
          <thead>
            <tr className="border-2 divide-x">
              <th className="px-3 py-2">Description</th>
              <th className="px-3">Target</th>
              <th className="px-3">Actual</th>
              <th className="px-3">%</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">Month Day</td>
              <td className="text-right px-3 font-semibold">{data.currentMonthTarget.day}</td>
              <td className="text-right px-3 font-semibold">
                {data.currentMonthActual.operationDay}
              </td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.currentMonthDayPercentage}
              </td>
            </tr>
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">Month Hour</td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.currentMonthTarget.operationHour}
              </td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.currentMonthActual.operationHour}
              </td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.currentMonthHourPercentage}
              </td>
            </tr>
            {/* <tr className="border-2 divide-x">
              <td className="px-3">YTD Day</td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.ytdTarget.operationDay}
              </td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.ytdActual.operationDay}
              </td>
              <td className="text-right px-3 font-semibold">{hourCalcData.ytdDayPercentage}</td>
            </tr> */}
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">YTD Hour</td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.ytdTarget.operationHour}
              </td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.ytdActual.operationHour}
              </td>
              <td className="text-right px-3 font-semibold">{hourCalcData.ytdHourPercentage}</td>
            </tr>
            <tr className="border-2 divide-x">
              <td className="px-3 py-1">Prognose Hour</td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.prognoseTarget.operationHour}
              </td>
              <td className="text-right px-3 font-semibold">
                {hourCalcData.prognoseActual.operationHour}
              </td>
              <td className="text-right px-3 font-semibold">{hourCalcData.prognosePercentage}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
