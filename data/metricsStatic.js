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
}
export default metricsStatic
