'use client'

import { TReliabilityYear } from '@/utils/definition'

export default function CardSummaryTargetYear({ data }) {
  console.log('CardSummaryTargetYear-data : ', data)
  const currentYearData: TReliabilityYear = data
  return (
    <>
      {/* Current year data */}
      <div className="bg-blue-50 p-3 rounded-2xl mb-3">
        <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
          <caption className="pb-2 text-left text-xl">{`Target Summary - ${currentYearData.year}`}</caption>
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
              <td className="text-right px-3 font-semibold">{currentYearData.unschSdDay}</td>
            </tr>
            <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50">
              <td className="px-3 py-1">Total plan S/D</td>
              <td className="text-right px-3 font-semibold">{currentYearData.totalPlanSdDay}</td>
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
    </>
  )
}
