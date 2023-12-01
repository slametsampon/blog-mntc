import { TOpex } from '@/utils/definition'
import { getMonthIndexShort } from '@/utils/getDateString'

export default function CardBudget({ title, opexData, capexData }) {
  const opexDisplayData: TOpex = opexData
  const capexDisplayData: TOpex = capexData

  const toDay = new Date()
  const currentMonth = toDay.getMonth()
  const ytdMonth = currentMonth + 1
  const prognoseMonth = currentMonth + 2

  return (
    <>
      <div className=" text-gray-900 text-sm dark:text-gray-100">
        {/* Budget */}
        <div className="bg-slate-50 p-3 rounded-2xl mb-3">
          <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
            <caption className="pb-2 text-left text-xl text-blue-700">{`${title} - $`}</caption>
            <thead>
              <tr className="text-blue-700">
                <th className="px-2 py-2">Month</th>
                <th className="px-2">OpexBudget</th>
                <th className="px-2">OpexActual</th>
                <th className="px-2">{`Opex (%)`}</th>
                <th className="px-2">CapexBudget</th>
                <th className="px-2">CapexActual</th>
                <th className="px-2">{`Capex (%)`}</th>
              </tr>
            </thead>
            <tbody>
              {opexData.month.map((mth) => {
                if (mth - 1 > prognoseMonth) return
                return (
                  <tr
                    key={mth}
                    className="border-2 odd:bg-green-50 odd:text-blue-700 even:bg-blue-50"
                  >
                    {mth - 1 === ytdMonth ? (
                      <td className="px-3 py-1 font-semibold">YTD</td>
                    ) : mth - 1 === prognoseMonth ? (
                      <td className="px-3 py-1 font-semibold">Prognose</td>
                    ) : (
                      <td className="px-3 py-1 font-semibold">{getMonthIndexShort(mth - 1)}</td>
                    )}
                    <td className="text-center">{opexDisplayData.monthBudget[mth - 1]}</td>
                    <td className="text-center">{opexDisplayData.monthActual[mth - 1]}</td>
                    <td className="text-center">{opexDisplayData.percentage[mth - 1]}</td>
                    <td className="text-center">{capexDisplayData.monthBudget[mth - 1]}</td>
                    <td className="text-center">{capexDisplayData.monthActual[mth - 1]}</td>
                    <td className="text-center">{capexDisplayData.percentage[mth - 1]}</td>
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
