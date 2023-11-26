import getMonthString from '@/utils/getMonthString'

export default function CardReliability({ title, reliabilityData }) {
  const toDay = new Date()
  const currentYearData = reliabilityData.currentYear

  return (
    <>
      <div className="mt-3 mb-3 rounded-xl bg-green-100  px-5 py-3 shadow-md dark:bg-gray-900">
        <div className="text-xl mb-3 text-blue-600 dark:text-gray-100 font-semibold">{title}</div>
        {/* Current year data */}
        <div className="bg-slate-50 p-3 rounded-2xl mb-3">
          <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
            <caption className="pb-2 text-left text-xl">{`Target - ${toDay.getFullYear()}`}</caption>
            <tbody>
              <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">Day</td>
                <td className="text-right px-3 font-semibold">{currentYearData.day}</td>
              </tr>
              <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">Schedule S/D</td>
                <td className="text-right px-3 font-semibold">{currentYearData.schSdDay}</td>
              </tr>
              <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">Un-Schedule S/D</td>
                <td className="text-right px-3 font-semibold">{currentYearData.uschSdDay}</td>
              </tr>
              <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">Operation Day</td>
                <td className="text-right px-3 font-semibold">{currentYearData.operationDay}</td>
              </tr>
              <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">Operation Hour</td>
                <td className="text-right px-3 font-semibold">{currentYearData.operationHour}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Current month */}
        <div className="bg-yellow-50 p-3 rounded-2xl">
          <table className="table-auto ml-3 mb-4 border-2 mt-3 dark:bg-gray-900 dark:text-gray-50 bg-green-50 rounded-2xl shadow-2xl">
            <caption className="pb-2 text-left text-xl">{`Current Month : ${getMonthString(
              toDay
            )}`}</caption>
            <thead>
              <tr>
                <th className="px-3 py-2">Description</th>
                <th className="px-3">Target</th>
                <th className="px-3">Actual</th>
                <th className="px-3">%</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-2 odd:bg-slate-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">Month Day</td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.currentMonthTarget.day}
                </td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.currentMonthActual.operationDay}
                </td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.percentage.currentMonthDay}
                </td>
              </tr>
              <tr className="border-2 odd:bg-slate-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">Month Hour</td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.currentMonthTarget.operationHour}
                </td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.currentMonthActual.operationHour}
                </td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.percentage.currentMonthHour}
                </td>
              </tr>
              <tr className="border-2 odd:bg-slate-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">YTD Hour</td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.ytdTarget.operationHour}
                </td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.ytdActual.operationHour}
                </td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.percentage.ytdHour}
                </td>
              </tr>
              <tr className="border-2 odd:bg-slate-50 odd:text-blue-700 even:bg-blue-50">
                <td className="px-3 py-1">Prognose Hour</td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.prognoseTarget.operationHour}
                </td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.prognoseActual.operationHour}
                </td>
                <td className="text-right px-3 font-semibold">
                  {reliabilityData.percentage.prognoseHour}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
