import { time } from '../lib/time'
import { usePopup } from '../hooks/usePopup'
import type { Time } from '../lib/time'
import { Tabs } from './Tabs'

export type TimeRange =
{
  start: Time
  end: Time
  name:
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'customTime'
  | 'twoMonthsAgo'
  | 'threeMonthsAgo'
}
interface Props {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; value: string }[]
}
const defaultTimeRanges: { key: TimeRange; value: string }[] = [
  { key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') }, value: '本月' },
  { key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') }, value: '上月' },
  { key: { name: 'thisYear', start: time().set({ month: 1 }).firstDayOfMonth, end: time().set({ month: 12 }).lastDayOfMonth.add(1, 'day') }, value: '今年' },
  { key: { name: 'customTime', start: time(), end: time() }, value: '自定义时间' }
]
export const TopTimeBar: React.FC<Props> = (props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const onConfirm = () => {
    _onSelect({ name: 'customTime', start: time(), end: time() })
  }
  const { openPopup, popup } = usePopup({ children: <div onClick={onConfirm}>弹窗</div>, position: 'center' })
  const onSelect = (timeRange: TimeRange) => {
    if (timeRange.name === 'customTime') {
      // 弹窗
      openPopup()
    } else {
      _onSelect(timeRange)
    }
  }
  return (
    <>
      {popup}
      <Tabs tabItems={timeRanges} selected={selected.name} onChange={onSelect} />
    </>
  )
}
