'use client'
export default function CardReliablityYear({ currentYearData, isPlanned }) {
  console.log('currentYearData : ', currentYearData)
  const properties = Object.keys(currentYearData)
  console.log('properties : ', properties)

  return (
    <>
      <div className="mt-3 mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
        {/* Current year data */}
        <div className="bg-blue-50 p-3 rounded-2xl mb-3">
          <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
            <caption className="pb-2 text-left text-xl">{`Target - ${currentYearData.year}`}</caption>
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
      </div>
    </>
  )
}
