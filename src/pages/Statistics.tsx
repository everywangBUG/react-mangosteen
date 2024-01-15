import React, { useState } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { TopTimeBar } from '../components/TopTimeBar'
import { Gradient } from '../components/Gradient'
import type { TimeRange } from '../components/TopTimeBar'
import { LineChart } from '../components/LineChart'

export const Statistics: React.FC = () => {
  const [timeRange, setTimeTange] = useState<TimeRange>('thisMonth')
  const items = [
    { date: '2022-01-01', value: 10000 },
    { date: '2022-01-02', value: 20000 },
    { date: '2022-01-03', value: 15000 },
    { date: '2022-01-29', value: 18000 },
  ].map(it => ({ x: it.date, y: it.value }))

  return (
    <div>
      <Gradient>
        <TopNav title='账目列表' icon={<Icon name='back' />} />
      </Gradient>
      <TopTimeBar selected={timeRange} onSelect={setTimeTange} />
      <LineChart className="h-400px" items={items} />
    </div>
  )
}
