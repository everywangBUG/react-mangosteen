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
  let selected: Time, start: Time, end: Time
  switch (timeRange) {
    case 'thisMonth':
    case 'lastMonth':
    case 'twoMonthsAgo':
    case 'threeMonthsAgo':
      selected = time().add(timeRangeMap[timeRange], 'month')
      start = selected.firstDayOfMonth
      end = start.lastDayOfMonth.add(1, 'day')
      return { start, end }
    case 'thisYear':
      start = time().set({ month: 1 }).firstDayOfMonth
      end = time().add(1, 'year').set({ month: 1 }).firstDayOfMonth
      return { start, end }
    case 'customTime':
      return { start: time(), end: time() }
  }
}
