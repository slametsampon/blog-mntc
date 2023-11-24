export default function CardBudget({ title }) {
  return (
    <>
      <div className="mt-3 mb-3 rounded-xl bg-red-100  px-5 py-3 shadow-md dark:bg-gray-900">
        <div className="text-xl mb-3 text-amber-800 dark:text-gray-100 font-semibold">{title}</div>
        <div className=" text-gray-900 text-sm dark:text-gray-100">
          <div>List OPEX</div>
          <div>List CAPEX</div>
        </div>
      </div>
    </>
  )
}
