import s from 'styled-components'
import { useState } from 'react'
import { TimePicker } from '../components/TimePicker'
import { TopNav } from '../components/TopNav'
import { TopTimeBar } from '../components/TopTimeBar'
import type { TimeRange } from '../components/TopTimeBar'
import type { IItems } from '../global.d.ts'
import { CountItems } from './items/CountItems'
import { CountDetailList } from './items/CountDetailList'

const Div = s.div`
  background: linear-gradient(0deg, rgba(89,38,185,1) 0%, rgba(150,0,255,1) 100%);
`

export const Items: React.FC = () => {
  const [timeRange, setTimeTange] = useState<TimeRange>('thisMonth')
  const [items, setItems] = useState<IItems>([
    {
      id: 1,
      user_id: 123,
      amount: 10,
      tag_ids: [1, 2, 3],
      happen_at: '2021-06-01',
      created_at: '2021-06-02',
      updated_at: '2021-06-03',
      kind: 'incomes'
    },
    {
      id: 2,
      user_id: 134,
      amount: 19,
      tag_ids: [1, 2, 3, 5],
      happen_at: '2021-06-01',
      created_at: '2023-06-10',
      updated_at: '2021-06-03',
      kind: 'incomes'
    },
  ])

  return (
    <div>
        <Div>
          <TopNav title='橙子记账' name='menu'/>
          <TopTimeBar selected={timeRange} onSelected={setTimeTange}/>
        </Div>
        <CountItems />
        <CountDetailList items={items} />
        <TimePicker />
    </div>
  )
}
