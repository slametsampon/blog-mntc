import { CiEdit } from 'react-icons/ci'
import { CiTrash } from 'react-icons/ci'

export default function CardListSD({ action, title, planSDList }) {
  console.log('CardListSD-planSDList', planSDList)
  if (planSDList === undefined) return
  const toDay = new Date()
  const year = toDay.getFullYear()
  const captionText = `${title} : ${year}`

  const onClickEditHandler = (item) => {
    action('EDIT', item)
  }

  const onClickDeleteHandler = (item) => {
    action('DELETE', item)
  }
  return (
    <>
      <div className="text-left px-3 text-lg font-semibold">{captionText}</div>
      {planSDList.length > 0 ? (
        <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
          <thead>
            <tr>
              <th className="px-3 py-2">Month</th>
              <th className="px-3">Description</th>
              <th className="px-3">Day</th>
              <th className="px-3">Edit</th>
              <th className="px-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {planSDList.map((item, index) => (
              <tr
                key={index}
                className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-green-50"
              >
                <td className="px-3 py-1">{item.dateStr}</td>
                <td className="text-right px-3">{item.description}</td>
                <td className="text-right px-3 font-semibold">{item.duration}</td>
                <td className="text-right px-3">
                  <button
                    onClick={(e) => onClickEditHandler(item)}
                    className="px-3 py-1 link-active"
                  >
                    <CiEdit />
                  </button>
                </td>
                <td className="text-right px-3">
                  <button
                    onClick={(e) => onClickDeleteHandler(item)}
                    className="px-3 py-1 link-active"
                  >
                    <CiTrash />
                  </button>
                </td>
              </tr>
            ))}
            {/* <tr className="border-2 odd:bg-blue-50 odd:text-blue-700 even:bg-slate-50">
              <td className="text-right px-3 font-semibold"></td>
              <td className="px-3 py-1 font-semibold">Total</td>
              <td className="text-right px-3 font-semibold">{totalDuration}</td>
              <td className="text-right px-3 font-semibold"></td>
              <td className="text-right px-3 font-semibold"></td>
            </tr>
            <tr className="border-2 odd:bg-blue-50 odd:text-blue-700 even:bg-slate-50">
              <td className="text-right px-3 font-semibold"></td>
              <td className="px-3 py-1 font-semibold">Year Day</td>
              <td className="text-right px-3 font-semibold"></td>
              <td className="text-right px-3 font-semibold">{yearDay}</td>
              <td className="text-right px-3 font-semibold"></td>
            </tr>
            <tr className="border-2 odd:bg-blue-50 odd:text-blue-700 even:bg-slate-50">
              <td className="text-right px-3 font-semibold"></td>
              <td className="px-3 py-1 font-semibold">Operation Day</td>
              <td className="text-right px-3 font-semibold"></td>
              <td className="text-right px-3 font-semibold">{operationDay}</td>
              <td className="text-right px-3 font-semibold"></td>
            </tr>
            <tr className="border-2 odd:bg-blue-50 odd:text-blue-700 even:bg-slate-50">
              <td className="text-right px-3 font-semibold"></td>
              <td className="px-3 py-1 font-semibold">Operation Hour</td>
              <td className="text-right px-3 font-semibold"></td>
              <td className="text-right px-3 font-semibold">{operationHour}</td>
              <td className="text-right px-3 font-semibold"></td>
            </tr> */}
          </tbody>
        </table>
      ) : (
        <div className="mt-3 px-3 dark:text-white text-red-700 font-semibold">No Data</div>
      )}
    </>
  )
}
