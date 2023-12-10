export default function CardDisturbance({ title, disturbanceData }) {
  const distInternal = disturbanceData.internal
  const distExternal = disturbanceData.external
  const distSummary = disturbanceData.summary
  return (
    <>
      <div className="mt-3 mb-3 rounded-xl bg-orange-50  px-5 py-3 shadow-md dark:bg-gray-900">
        <div className="text-xl mb-3 text-green-700 dark:text-gray-100 font-semibold">{title}</div>
        <div className=" text-gray-900 text-sm dark:text-gray-100">
          {/* Disturbance Internal */}
          <div className="bg-slate-50 p-3 rounded-2xl mb-3">
            <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
              <caption className="text-left text-xl">Internal</caption>
              <thead>
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3">Description</th>
                  <th className="px-3">Hour</th>
                </tr>
              </thead>
              <tbody>
                {distInternal.map((disturbance) => (
                  <tr
                    key={disturbance.dateStr}
                    className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-green-50"
                  >
                    <td className="px-3 py-1">{disturbance.dateStr}</td>
                    <td className="text-right px-3 font-semibold">{disturbance.description}</td>
                    <td className="text-right px-3 font-semibold">{disturbance.duration}</td>
                  </tr>
                ))}
                <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-green-50">
                  <td className="text-right px-3 font-semibold"></td>
                  <td className="px-3 py-1 font-semibold">Total</td>
                  <td className="text-right px-3 font-semibold">{distSummary.internal}</td>
                </tr>
              </tbody>
            </table>
            {/* Disturbance External */}
            <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
              <caption className="text-left text-xl">External</caption>
              <thead>
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3">Description</th>
                  <th className="px-3">Hour</th>
                </tr>
              </thead>
              <tbody>
                {distExternal.map((disturbance) => (
                  <tr
                    key={disturbance.dateStr}
                    className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-green-50"
                  >
                    <td className="px-3 py-1">{disturbance.dateStr}</td>
                    <td className="text-right px-3 font-semibold">{disturbance.description}</td>
                    <td className="text-right px-3 font-semibold">{disturbance.duration}</td>
                  </tr>
                ))}
                <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-green-50">
                  <td className="text-right px-3 font-semibold"></td>
                  <td className="px-3 py-1 font-semibold">Total</td>
                  <td className="text-right px-3 font-semibold">{distSummary.external}</td>
                </tr>
                <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-green-50">
                  <td className="text-right px-3 font-semibold"></td>
                  <td className="px-3 py-1 font-semibold">Total Disturbance</td>
                  <td className="text-right px-3 font-semibold">{distSummary.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
