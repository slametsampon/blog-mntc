import CardDisturbance from '@/components/CardDisturbance'
import { genPageMetadata } from '../seo'
import CardReliability from '@/components/CardReliability'
import CardBudget from '@/components/CardBudget'
import metricsStatic from '@/data/metricsStatic'

export const metadata = genPageMetadata({ title: 'Metrics' })

export default function Page() {
  const toDay = new Date()
  const reliabilityData = metricsStatic.reliability
  return (
    <>
      <div className="text-2xl mt-3 mb-3 font-semibold rounded-xl bg-cyan-100 px-2 py-3 shadow-md dark:bg-gray-900">
        {`KPI - Metrics, ${toDay.toLocaleDateString()}`}
      </div>
      <CardReliability title={'Reliability'} data={reliabilityData} />
      <CardDisturbance title={'Disturbances'} />
      <CardBudget title={'Expenditure'} />
    </>
  )
}
