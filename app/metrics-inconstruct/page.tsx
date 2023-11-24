import CardDisturbance from '@/components/CardDisturbance'
import { genPageMetadata } from '../seo'
import CardReliability from '@/components/CardReliability'
import CardBudget from '@/components/CardBudget'

export const metadata = genPageMetadata({ title: 'Metrics' })

export default function Page() {
  return (
    <>
      <div className="text-2xl mt-3 mb-3 font-semibold rounded-xl bg-cyan-100 px-2 py-3 shadow-md dark:bg-gray-900">
        KPI - Metrics
      </div>
      <CardReliability title={'Reliability'} />
      <CardDisturbance title={'Disturbances'} />
      <CardBudget title={'Expenditure'} />
    </>
  )
}
