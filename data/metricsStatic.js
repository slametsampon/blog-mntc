const metricsStatic = {
  reliability: {
    currentYear: { day: 365, schSdDay: 13, uschSdDay: 5 },
    monthDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    monthTargetDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    monthTargetHrs: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    monthActualHrs: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  },
  opex: {
    monthBudget: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
    monthActual: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  capex: {
    monthBudget: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
    monthActual: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  disturbance: {
    internal: [
      { date: '2023-01-15', desc: 'disturbance internal-1', duration: 5 },
      { date: '2023-02-15', desc: 'disturbance internal-2', duration: 1.4 },
      { date: '2023-03-15', desc: 'disturbance internal-3', duration: 2 },
    ],
    external: [
      { date: '2023-02-15', desc: 'disturbance external-1', duration: 5 },
      { date: '2023-03-15', desc: 'disturbance external-2', duration: 1.4 },
      { date: '2023-05-15', desc: 'disturbance external-3', duration: 2 },
    ],
  },
}
export default metricsStatic
