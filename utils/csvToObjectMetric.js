import metricsStatic from '@/data/metricsStatic'

export default function csvToObjectMetric(headers, values) {
  const toDay = new Date()
  const idx_opexBudget = headers.indexOf('opexBudget')
  const idx_opexActual = headers.indexOf('opexActual')
  const idx_capexBudget = headers.indexOf('capexBudget')
  const idx_capexActual = headers.indexOf('capexActual')

  const data_opexBudget = []
  const data_opexActual = []
  const data_capexBudget = []
  const data_capexActual = []
  for (let i = 0; i < toDay.getMonth(); i++) {
    data_opexBudget.push(values[i][idx_opexBudget])
    data_opexActual.push(values[i][idx_opexActual])
    data_capexBudget.push(values[i][idx_capexBudget])
    data_capexActual.push(values[i][idx_capexActual])
  }
  for (let i = 0; i < toDay.getMonth(); i++) {
    metricsStatic.capex.monthBudget[i] = data_capexBudget[i]
    metricsStatic.capex.monthActual[i] = data_capexActual[i]
    metricsStatic.opex.monthBudget[i] = data_opexBudget[i]
    metricsStatic.opex.monthActual[i] = data_opexActual[i]
  }
  console.log('metricsStatic.capex : ', metricsStatic.capex)
  console.log('metricsStatic.opex : ', metricsStatic.opex)
}
