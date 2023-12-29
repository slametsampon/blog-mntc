export function getYearMonthDate(dateValue) {
  //set schedule date
  // Create a date object from a date string
  var date = new Date()
  if (dateValue) date = new Date(dateValue)

  // Get year, month, and day part from the date
  const year = date.toLocaleString('default', { year: 'numeric' })
  const month = date.toLocaleString('default', { month: '2-digit' })
  const day = date.toLocaleString('default', { day: '2-digit' })

  // Generate yyyy-mm-dd date string
  const formattedDate = year + '-' + month + '-' + day
  return formattedDate
}

export function getYearMonth(dateValue) {
  //set schedule date
  // Create a date object from a date string
  var date = new Date()
  if (dateValue) date = new Date(dateValue)

  // Get year, month, and day part from the date
  const year = date.toLocaleString('default', { year: 'numeric' })
  const month = date.toLocaleString('default', { month: '2-digit' })

  // Generate yyyy-mm date string
  const formattedDate = year + '-' + month
  return formattedDate
}

export function getYear(dateValue) {
  //set schedule date
  // Create a date object from a date string
  var date = new Date()
  if (dateValue) date = new Date(dateValue)

  // Get year, month, and day part from the date
  const year = date.toLocaleString('default', { year: 'numeric' })

  // Generate yyyy-mm date string
  const formattedDate = year
  return formattedDate
}

export function getMonth(dateValue) {
  //set schedule date
  // Create a date object from a date string
  var date = new Date()
  if (dateValue) date = new Date(dateValue)

  // Get year, month, and day part from the date
  const month = date.toLocaleString('default', { month: '2-digit' })

  // Generate yyyy-mm date string
  const formattedDate = month
  return formattedDate
}

export function getMonthDays(year, month) {
  return new Date(year, month, 0).getDate()
}

export function getDayOfYear(year) {
  const isLeapYeart = year % 400 === 0 || year % 100 === 0 || year % 4 === 0
  return isLeapYeart ? 366 : 365
}
