import { useState } from 'react'
import { Input } from '../components/Input'
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
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')
  const onConfirm = () => {
    _onSelect({ name: 'customTime', start: time(), end: time() })
  }
  const { openPopup, popup } = usePopup({
    zIndex: 'var(--z-dialog)',
    children:
    <div onClick={onConfirm}>
      <header p-l-16px py-16px bg="[var(--color-orange)]">请选择时间</header>
      <main p-16px>
        <Input label={'开始时间'} type='date' disableError value={start} onChange={setStart} />
        <Input className={'m-t-16px'} label={'结束时间'} type='date' disableError value={end} onChange={setEnd} />
      </main>
      <footer text-right>
        <button bg-transparent py-8px px-16px>取消</button>
        <button bg-transparent py-8px px-16px>确定</button>
      </footer>
    </div>,
    position: 'center'
  })
  const onSelect = (timeRange: TimeRange) => {
    if (timeRange.name === 'customTime') {
      // 弹窗
      openPopup()
      _onSelect(timeRange)
    } else {
      _onSelect(timeRange)
    }
  }
  return (
    <>
      {popup}
      <Tabs tabItems={timeRanges} selected={selected} onChange={onSelect} />
    </>
  )
}
