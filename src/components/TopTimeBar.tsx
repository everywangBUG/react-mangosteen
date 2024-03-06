import { Tabs } from './Tabs'

export type TimeRange =
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'customTime'
  | 'twoMonthsAgo'
  | 'threeMonthsAgo'
interface Props {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; value: string }[]
}
const defaultTimeRanges: { key: TimeRange; value: string }[] = [
  { key: 'thisMonth', value: '本月' },
  { key: 'lastMonth', value: '上月' },
  { key: 'thisYear', value: '今年' },
  { key: 'customTime', value: '自定义时间' }
]
export const TopTimeBar: React.FC<Props> = (props) => {
  const { selected, onSelect, timeRanges = defaultTimeRanges } = props
  return (
    <>
      <Tabs tabItems={timeRanges} selected={selected} onChange={onSelect} />
    </>
  )
}
