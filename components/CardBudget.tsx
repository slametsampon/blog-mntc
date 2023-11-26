export default function CardBudget({ title, opexData, capexData }) {
  return (
    <>
      <div className="mt-3 mb-3 rounded-xl bg-yellow-100  px-5 py-3 shadow-md dark:bg-gray-900">
        <div className="text-xl mb-3 text-amber-800 dark:text-gray-100 font-semibold">{title}</div>
        <div className=" text-gray-900 text-sm dark:text-gray-100">
          {/* OPEX */}
          <div className="bg-slate-50 p-3 rounded-2xl mb-3">
            <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
              <caption className="pb-2 text-left text-xl">OPEX - $</caption>
              <thead>
                <tr>
                  <th className="px-3 py-2">Month</th>
                  <th className="px-3">Budget</th>
                  <th className="px-3">Actual</th>
                  <th className="px-3">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {opexData.month.map((mth) => (
                  <tr
                    key={mth}
                    className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50"
                  >
                    <td className="px-3 py-1">{mth}</td>
                    <td className="text-right px-3 font-semibold">
                      {capexData.monthBudget[mth - 1]}
                    </td>
                    <td className="text-right px-3 font-semibold">
                      {capexData.monthActual[mth - 1]}
                    </td>
                    <td className="text-right px-3 font-semibold">
                      {capexData.percentage[mth - 1]}
                    </td>
                  </tr>
                ))}
                <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50">
                  <td className="px-3 py-1 font-semibold">Total</td>
                  <td className="text-right px-3 font-semibold">{opexData.ytd.budget}</td>
                  <td className="text-right px-3 font-semibold">{opexData.ytd.actual}</td>
                  <td className="text-right px-3 font-semibold">{opexData.ytd.percentage}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* CAPEX */}
          <div className="bg-slate-50 p-3 rounded-2xl mb-3">
            <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
              <caption className="pb-2 text-left text-xl">CAPEX - $</caption>
              <thead>
                <tr>
                  <th className="px-3 py-2">Month</th>
                  <th className="px-3">Budget</th>
                  <th className="px-3">Actual</th>
                  <th className="px-3">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {capexData.month.map((mth) => (
                  <tr
                    key={mth}
                    className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50"
                  >
                    <td className="px-3 py-1">{mth}</td>
                    <td className="text-right px-3 font-semibold">
                      {capexData.monthBudget[mth - 1]}
                    </td>
                    <td className="text-right px-3 font-semibold">
                      {capexData.monthActual[mth - 1]}
                    </td>
                    <td className="text-right px-3 font-semibold">
                      {capexData.percentage[mth - 1]}
                    </td>
                  </tr>
                ))}
                <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50">
                  <td className="px-3 py-1 font-semibold">Total</td>
                  <td className="text-right px-3 font-semibold">{capexData.ytd.budget}</td>
                  <td className="text-right px-3 font-semibold">{capexData.ytd.actual}</td>
                  <td className="text-right px-3 font-semibold">{capexData.ytd.percentage}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
