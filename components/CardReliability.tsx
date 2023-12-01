import { TReliability, TReliabilityYear } from '@/utils/definition'
import { getMonthFull, getMonthIndexShort } from '@/utils/getDateString'

export default function CardReliability({ title, reliabilityData }) {
  const toDay = new Date()
  const currentMonth = toDay.getMonth()
  const ytdMonth = currentMonth + 1
  const prognoseMonth = currentMonth + 2

  const currentYearData: TReliabilityYear = reliabilityData.currentYear
  const reliabilityDisplayData: TReliability = reliabilityData

  return (
    <>
      <div className="mt-3 mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
        <div className="text-xl mb-3 text-blue-600 dark:text-gray-100 font-semibold">{title}</div>
        {/* Current year data */}
        <div className="bg-blue-50 p-3 rounded-2xl mb-3">
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
                <td className="text-right px-3 font-semibold">
                  {currentYearData.operationTargetHour}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Current month */}
        <div className="bg-yellow-50 p-3 rounded-2xl">
          <table className="table-auto ml-3 mb-4 border-2 mt-3 dark:bg-gray-900 dark:text-gray-50 bg-green-50 rounded-2xl shadow-2xl">
            <caption className="pb-2 text-left text-xl">{`Running Hour : ${getMonthFull(
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
              {reliabilityDisplayData.monthTargetHrs.map((hrs, index) => {
                if (index > prognoseMonth) return
                return (
                  <tr
                    key={index}
                    className="border-2 odd:bg-green-50 odd:text-blue-700 even:bg-blue-50"
                  >
                    {index === ytdMonth ? (
                      <td className="px-3 py-1 font-semibold">YTD Hour</td>
                    ) : index === prognoseMonth ? (
                      <td className="px-3 py-1 font-semibold">Prognose Hour</td>
                    ) : (
                      <td className="px-3 py-1 font-semibold">{getMonthIndexShort(index)}</td>
                    )}
                    <td className="px-3 text-right">
                      {reliabilityDisplayData.monthTargetHrs[index]}
                    </td>
                    <td className="px-3 text-right">
                      {reliabilityDisplayData.monthActualHrs[index]}
                    </td>
                    <td className="px-3 text-right">
                      {reliabilityDisplayData.percentageHour[index]}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
