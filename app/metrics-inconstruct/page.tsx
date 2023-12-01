import CardDisturbance from '@/components/CardDisturbance'
import { genPageMetadata } from '../seo'
import CardReliability from '@/components/CardReliability'
import CardBudget from '@/components/CardBudget'
import metricsStatic from '@/data/metricsStatic'
import { capexCalc, disturbanceCalc, hourCalc, opexCalc, yearTargetCalc } from '@/utils/metricsCalc'

export const metadata = genPageMetadata({ title: 'Metrics' })

export default function Page() {
  const toDay = new Date()
  const reliabilityData = metricsStatic.reliability
  const disturbanceData = metricsStatic.disturbance
  const opexData = metricsStatic.opex
  const capexData = metricsStatic.capex

  yearTargetCalc(reliabilityData.currentYear)
  disturbanceCalc(reliabilityData, disturbanceData)
  hourCalc(reliabilityData, toDay)
  opexCalc(opexData, toDay)
  capexCalc(capexData, toDay)

  // console.log('after Calc reliabilityData : ', reliabilityData)
  // console.log('after Calc disturbanceData : ', disturbanceData)
  // console.log('after Calc opexData : ', opexData)
  // console.log('after Calc capexData : ', capexData)

  return (
    <>
      <div className="text-2xl mt-3 mb-3 font-semibold rounded-xl bg-cyan-100 px-2 py-3 shadow-md dark:bg-gray-900">
        {`KPI - Metrics, ${toDay.toLocaleDateString()}`}
      </div>
      <CardReliability title={'Reliability'} reliabilityData={reliabilityData} />
      <CardDisturbance title={'Disturbances'} disturbanceData={disturbanceData} />
      <CardBudget title={'Budget'} opexData={opexData} capexData={capexData} />
    </>
  )
}
