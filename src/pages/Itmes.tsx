import React, { useState } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { TopMenu } from '../components/TopMenu'
import { TopTimeBar } from '../components/TopTimeBar'
import type { TimeRange } from '../components/TopTimeBar'
import { useMenuVisible } from '../stores/useMenuVisible'
import { Gradient } from '../components/Gradient'
import { AddButton } from '../components/AddButton'
import { generateStartAndEnd } from '../lib/generateStartAndEnd'
import { CountItems } from './items/CountItems'
import { CountDetailList } from './items/CountDetailList'

export const Items: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuVisible()

  const { start, end } = generateStartAndEnd(timeRange)

  return (
    <div>
      <Gradient>
        <TopNav title='橙子记账' icon={<Icon name='menu' className="w-24px h-24px" onClick={() => { setVisible(!visible) }}/>}/>
      </Gradient>
      <TopTimeBar selected={timeRange} onSelect={setTimeRange}/>
      <CountItems />
      <CountDetailList start={start} end={end} />
      <AddButton />
      { <TopMenu visible={visible} onClickMask={() => { setVisible(false) }}/> }
    </div>
  )
}
