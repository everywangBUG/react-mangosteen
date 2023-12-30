import React, { useState } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { TopTimeBar } from '../components/TopTimeBar'
import type { TimeRange } from '../components/TopTimeBar'
import type { IItems } from '../global.d.ts'
import { useMenuVisible } from '../stores/useMenuVisible'
import { Gradient } from '../components/Gradient'
import { CountItems } from './items/CountItems'
import { CountDetailList } from './items/CountDetailList'

export const Items: React.FC = () => {
  const [timeRange, setTimeTange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuVisible()
  const [items] = useState<IItems[]>([
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
      <Gradient>
        <TopNav title='橙子记账' icon={<Icon name='menu' className="w-24px h-24px" onClick={() => { setVisible(!visible) }}/>}/>
        <TopTimeBar selected={timeRange} onSelected={setTimeTange}/>
      </Gradient>
      <CountItems />
      <CountDetailList items={items} />
      { <TopMenu visible={visible} onClickMask={() => { setVisible(false) }}/> }
    </div>
  )
}
