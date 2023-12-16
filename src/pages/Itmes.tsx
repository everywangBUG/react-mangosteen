import s from 'styled-components'
import { useState } from 'react'
import { TimePicker } from '../components/TimePicker'
import { TopNav } from '../components/TopNav'
import { TopTimeBar } from '../components/TopTimeBar'
import type { TimeRange } from '../components/TopTimeBar'
import { CountDetail } from './items/CountDetail'
import { CountItems } from './items/CountItems'

const Div = s.div`
  background: linear-gradient(0deg, rgba(89,38,185,1) 0%, rgba(150,0,255,1) 100%);
`

export const Items: React.FC = () => {
  const [timeRange, setTimeTange] = useState<TimeRange>('thisMonth')

  return (
    <div>
        <Div>
          <TopNav title='山竹记账' name='menu'/>
          <TopTimeBar selected={timeRange} onSelected={setTimeTange}/>
        </Div>
        <CountDetail />
        <CountItems />
        <TimePicker />
    </div>
  )
}
