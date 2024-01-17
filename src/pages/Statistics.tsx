import React, { useState } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { TopTimeBar } from '../components/TopTimeBar'
import { Gradient } from '../components/Gradient'
import type { TimeRange } from '../components/TopTimeBar'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'

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
    { tag: '购物', value: 20000 },
    { tag: '交通', value: 15000 },
    { tag: '娱乐', value: 30000 },
    { tag: '旅行', value: 25000 },
  ].map(it => ({ x: it.tag, y: it.value / 100 }))

  return (
    <div>
      <Gradient>
        <TopNav title='账目列表' icon={<Icon name='back' />} />
      </Gradient>
      <TopTimeBar selected={timeRange} onSelect={setTimeTange} />
      <LineChart className="h-120px" items={items1} />
      <PieChart className="h-400px mt-10" items={items2}/>
    </div>
  )
}
