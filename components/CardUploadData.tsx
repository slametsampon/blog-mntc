export default function CardUploadData({ title, uploadHeader, uploadData }) {
  return (
    <>
      <div className=" text-gray-900 text-sm dark:text-gray-100">
        {/* Uploaded Data from csv */}
        <div className="bg-yellow-50 p-3 rounded-2xl mt-7 mb-3">
          <table className="table-auto ml-3 mb-3 border-2 mt-3 bg-blue-50 rounded-2xl shadow-2xl dark:bg-gray-900 dark:text-gray-50">
            <caption className="pb-2 text-left text-xl">{title}</caption>
            <thead>
              <tr>
                {uploadHeader.map((rows, index) => {
                  return (
                    <th className="px-3 py-2" key={index}>
                      {rows}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {uploadData.map((value, index) => {
                return (
                  <tr
                    key={index}
                    className="border-2 odd:bg-yellow-50 odd:text-blue-700 even:bg-blue-50"
                  >
                    {value.map((val, i) => {
                      return (
                        <td key={i} className="px-3 py-1">
                          {val}
                        </td>
                      )
                    })}
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
