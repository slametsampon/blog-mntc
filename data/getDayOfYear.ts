export default function getDayOfYear(year: number) {
  const isLeapYeart = year % 400 === 0 || year % 100 === 0 || year % 4 === 0
  return isLeapYeart ? 366 : 365
}
