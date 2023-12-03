import { CiEdit } from 'react-icons/ci'
import { CiTrash } from 'react-icons/ci'

export default function CardScheduleSD({ title, unscheduleSD }) {
  let totalDuration = 0
  unscheduleSD.map((item) => (totalDuration += item.duration))
  return (
    <>
      <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
        <caption className="text-left text-xl">{title}</caption>
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
          {unscheduleSD.map((item) => (
            <tr
              key={item.date}
              className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-green-50"
            >
              <td className="px-3 py-1">{item.date}</td>
              <td className="text-right px-3">{item.description}</td>
              <td className="text-right px-3 font-semibold">{item.duration}</td>
              <td className="text-right px-3">
                <button className="px-3 py-1 link-active">
                  <CiEdit />
                </button>
              </td>
              <td className="text-right px-3">
                <button className="px-3 py-1 link-active">
                  <CiTrash />
                </button>
              </td>
            </tr>
          ))}
          <tr className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-green-50">
            <td className="text-right px-3 font-semibold"></td>
            <td className="px-3 py-1 font-semibold">Total</td>
            <td className="text-right px-3 font-semibold">{totalDuration}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
