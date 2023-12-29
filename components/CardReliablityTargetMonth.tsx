'use client'

import { getMonthIndexShort } from '@/utils/getDateString'

export default function CardReliablityTargetMonth({ targetData, summaryData }) {
  const toDay = new Date()

  return (
    <>
      <table className="table-auto ml-3 mb-4 border-2 mt-8 dark:bg-gray-900 dark:text-gray-50 bg-green-50 rounded-2xl shadow-2xl">
        <caption className="pb-2 text-left text-xl">{`Detail Month Target : ${toDay.getFullYear()}`}</caption>
        <thead>
          <tr className="text-green-700">
            <th className="px-3 py-2">Month</th>
            <th className="px-3">Day</th>
            <th className="px-3">Target-Day</th>
            <th className="px-3">Target-Hour</th>
          </tr>
        </thead>
        <tbody>
          {targetData.monthDay.map((days, index) => {
            if (targetData.monthDay.length <= 0) return <div>No Data</div>
            return (
              <tr
                key={index}
                className="border-2 odd:bg-green-50 odd:text-blue-700 even:bg-blue-50"
              >
                <td className="px-3 py-1 font-semibold">{getMonthIndexShort(index)}</td>
                <td className="px-3 text-right">{days}</td>
                <td className="px-6 text-right">{targetData.monthTargetDay[index]}</td>
                <td className="px-6 text-right">{targetData.monthTargetHrs[index]}</td>
              </tr>
            )
          })}
          <tr className="border-2 odd:bg-green-50 odd:text-green-700 even:bg-blue-50">
            <td className="px-3 py-1 font-semibold">Total</td>
            <td className="text-right px-3 font-semibold">{summaryData.day}</td>
            <td className="text-right px-3 font-semibold">{summaryData.operationDay}</td>
            <td className="text-right px-3 font-semibold">{summaryData.operationTargetHour}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
