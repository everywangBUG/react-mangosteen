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
  { key: 'twoMonthsAgo', value: '两月前' },
  { key: 'threeMonthsAgo', value: '三个月前' }
]
export const TopTimeBar: React.FC<Props> = (props) => {
  const { selected, onSelect, timeRanges = defaultTimeRanges } = props
  return (
    <>
      <Tabs tabItems={timeRanges} selected={selected} onChange={onSelect} />
    </>
  )
}
