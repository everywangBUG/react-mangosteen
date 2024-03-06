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

export const Statistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [type, setType] = useState<ExpendIncome>('expenses')
  const { get } = useAjax({ showLoading: false, handleError: true })

  const generateStartAndEnd = () => {
    if (timeRange === 'thisMonth') {
      const start = time().firstDayOfMonth.format('yyyy-MM-dd')
      const end = time().lastDayOfMonth.add(1, 'day').format('yyyy-MM-dd')
      return { start, end }
    } else {
      return { start: '', end: '' }
    }
  }
  const { start, end } = generateStartAndEnd()
  const { data: items1 } = useSWR(`/api/v1/items/summary?happen_after=${start}&happen_before=${end}&kind=${type}&group_by=happen_at`, async (path) => {
    const response = await get<{ groups: { happen_at: string; amount: number }[]; total: number }>(path)
    return response.data.groups.map(it => ({ x: it.happen_at, y: it.amount / 100 }))
  })

  const items2 = [
    { tag: '餐饮', value: 10000 },
    { tag: '交通', value: 15000 },
    { tag: '购物', value: 20000 },
    { tag: '旅行', value: 25000 },
    { tag: '娱乐', value: 30000 },
  ].map(it => ({ x: it.tag, y: it.value / 100 }))

  const items3 = [
    { tag: { name: '餐饮', sign: '🍈' }, amount: 10000 },
    { tag: { name: '交通', sign: '🚗' }, amount: 15000 },
    { tag: { name: '购物', sign: '🛍' }, amount: 20000 },
    { tag: { name: '旅行', sign: '🚂' }, amount: 25000 },
  ].map(it => ({ name: it.tag.name, value: it.amount / 100, icon: it.tag.sign }))

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
      <LineChart className="h-120px mt-10" items={items1} />
      <PieChart className="h-400px mt-10" items={items2} />
      <RankChart className="h-100px mt-10" items={items3} />
    </div>
  )
}
