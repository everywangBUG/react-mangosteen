import type { ReactNode } from 'react'
import { Tabs } from './Tabs'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'customTime'
interface Props {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
}
const timeRanges: { key: TimeRange; value: string; element: ReactNode }[] = [
  { key: 'thisMonth', value: '本月', element: <span></span> },
  { key: 'lastMonth', value: '上月', element: <span></span> },
  { key: 'thisYear', value: '今年', element: <span></span> },
  { key: 'customTime', value: '自定义时间', element: <span></span> }
]
export const TopTimeBar: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <>
      <Tabs tabItems={timeRanges} selected={selected} onChange={onSelect}/>
    </>
  )
}
