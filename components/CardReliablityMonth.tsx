'use client'

import { getMonthFull, getMonthIndexShort } from '@/utils/getDateString'
import Linechart from './Linechart'

export default function CardReliablityMonth({ reliabilityDisplayData }) {
  const toDay = new Date()
  const currentMonth = toDay.getMonth()
  const ytdMonth = currentMonth
  const prognoseMonth = currentMonth + 1

  const labels = reliabilityDisplayData.percentageHour.map((mt, index) => {
    if (index > prognoseMonth) return
    if (index === ytdMonth) return 'Ytd'
    if (index === prognoseMonth) return 'Prg'
    return getMonthIndexShort(index)
  })

  const datasets = reliabilityDisplayData.percentageHour.map((hrs, index) => {
    if (index > prognoseMonth) return
    return hrs
  })
  return (
    <>
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
      <Linechart title="Running Hour (%)" labels={labels} datasets={datasets} />{' '}
    </>
  )
}
