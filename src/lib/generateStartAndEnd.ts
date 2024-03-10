import type { Time } from '../lib/time'
import { time } from '../lib/time'
import type { TimeRange } from '../components/TopTimeBar'

const timeRangeMap: { [ key in TimeRange]: number } = {
  thisMonth: 0,
  lastMonth: -1,
  twoMonthsAgo: -2,
  threeMonthsAgo: -3,
  thisYear: 0,
  customTime: 0
}

export const generateStartAndEnd = (timeRange: TimeRange) => {
  const selected: Time = time().add(timeRangeMap[timeRange], 'month')
  const start: Time = selected.firstDayOfMonth
  const end: Time = start.lastDayOfMonth.add(1, 'day')
  return { start, end }
}
