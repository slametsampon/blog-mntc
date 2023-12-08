import { TReliability, TReliabilityYear } from '@/utils/definition'
import CardReliablityYear from './CardReliablityYear'
import CardReliablityMonth from './CardReliablityMonth'

export default function CardReliability({ title, reliabilityData }) {
  const currentYearData: TReliabilityYear = reliabilityData.currentYear
  const reliabilityDisplayData: TReliability = reliabilityData

  return (
    <>
      <div className="mt-3 mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
        <div className="text-xl mb-3 text-blue-600 dark:text-gray-100 font-semibold">{title}</div>
        <CardReliablityYear currentYearData={currentYearData} isPlanned={false} />
        <CardReliablityMonth reliabilityDisplayData={reliabilityDisplayData} />
      </div>
    </>
  )
}
