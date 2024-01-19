import React, { useState } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { TopTimeBar } from '../components/TopTimeBar'
import { Gradient } from '../components/Gradient'
import type { TimeRange } from '../components/TopTimeBar'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import { Input } from '../components/Input'

export const Statistics: React.FC = () => {
  const [timeRange, setTimeTange] = useState<TimeRange>('thisMonth')
  const items1 = [
    { date: '2022-01-01', value: 10000 },
    { date: '2022-01-02', value: 20000 },
    { date: '2022-01-03', value: 15000 },
    { date: '2022-01-04', value: 30000 },
    { date: '2022-01-05', value: 25000 },
    { date: '2022-01-06', value: 18000 },
    { date: '2022-01-07', value: 22000 },
    { date: '2022-01-29', value: 18000 },
  ].map(it => ({ x: it.date, y: it.value / 100 }))

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

  return (
    <div>
      <Gradient>
        <TopNav title='账目列表' icon={<Icon name='back' />} />
      </Gradient>
      <TopTimeBar selected={timeRange} onSelect={setTimeTange} />
      <div flex items-center px-16px gap-x-16px p-16px>
        <span grow-0 shrink-0 text->类型</span>
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
