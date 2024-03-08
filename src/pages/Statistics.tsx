import React, { useState } from 'react'
import useSWR from 'swr'
import { TopNav } from '../components/TopNav'
import { TopTimeBar } from '../components/TopTimeBar'
import { Gradient } from '../components/Gradient'
import type { TimeRange } from '../components/TopTimeBar'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'
import { time } from '../lib/time'
import { BackIcon } from '../components/BackIcon'
import { useAjax } from '../lib/ajax'
import type { Time } from '../lib/time'

interface GroupHappenAt {
  groups: { happen_at: string; amount: number }[]
  total: number
}

interface GroupTag {
  amount: number
  tag: Tag
  tag_id: number
}

interface GroupTagId {
  groups: GroupTag[]
}

interface Params {
  start: Time
  end: Time
  kind: ExpendIncome
  group_by: 'happen_at' | 'tag_id'
}

const timeRangeMap: { [ key in TimeRange]: number } = {
  thisMonth: 0,
  lastMonth: -1,
  twoMonthsAgo: -2,
  threeMonthsAgo: -3,
  thisYear: 0,
  customTime: 0
}

export const Statistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState<ExpendIncome>('expenses')
  const { get } = useAjax({ showLoading: false, handleError: true })
  const format = 'yyyy-MM-dd'

  const getKey = ({ start, end, kind, group_by }: Params) => {
    return `/api/v1/items/summary?happen_after=${start.format(format)}&happen_before=${end.format(format)}&kind=${kind}&group_by=${group_by}`
  }

  const generateStartAndEnd = () => {
    const selected: Time = time().add(timeRangeMap[timeRange], 'month')
    const start: Time = selected.firstDayOfMonth
    const end: Time = start.lastDayOfMonth.add(1, 'day')
    return { start, end }
  }

  const generateDefaultItems = (time: any) => {
    return Array.from({ length: time.dayCountOfMonth }).map((_, index) => {
      const x = start.clone.add(index, 'day').format(format)
      return { x, y: 0 }
    })
  }
  const { start, end } = generateStartAndEnd()
  const defaultItems = generateDefaultItems(start)
  const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happen_at' }),
    async (path) => {
      const response = await get<GroupHappenAt>(path)
      return response.data.groups.map(it => ({ x: it.happen_at, y: it.amount / 100 }))
    })

  const lineItems = defaultItems?.map((defaultItem) =>
    items?.find(item => item.x === defaultItem.x) ?? defaultItem
  )

  const { data: tagItems } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }),
    async (path) => {
      const response = await get<GroupTagId>(path)
      return response.data.groups
    })

  const pieItems = tagItems?.map(it => ({ name: it.tag.name, value: it.amount / 100 })) ?? []

  const rankItems = tagItems?.map(it => ({ name: it.tag.name, value: it.amount / 100, icon: it.tag.sign }))

  const timeRanges: { key: TimeRange; value: string }[] = [
    { key: 'thisMonth', value: '本月' },
    { key: 'lastMonth', value: '上月' },
    { key: 'twoMonthsAgo', value: '两月前' },
    { key: 'threeMonthsAgo', value: '三月前' },
  ]

  return (
    <div>
      <Gradient>
        <TopNav title='账目列表' icon={<BackIcon />} />
      </Gradient>
      <TopTimeBar selected={timeRange} onSelect={setTimeRange} timeRanges={timeRanges} />
      <div flex items-center px-16px gap-x-16px p-16px>
        <span grow-0 shrink-0>类型</span>
        <div grow-1 shrink-1>
          <Input type='select' options={[{ value: '19', text: '红色' }, { value: '支出', text: '白色' }]} value='expenses' disableError={true} />
        </div>
      </div>
      <LineChart className="h-120px mt-10" items={lineItems} />
      <PieChart className="h-400px mt-10" items={pieItems} />
      <RankChart className="h-100px mt-10" items={rankItems} />
    </div>
  )
}
