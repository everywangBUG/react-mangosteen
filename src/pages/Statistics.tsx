import React, { useState } from 'react'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { TopTimeBar } from '../components/TopTimeBar'
import { Gradient } from '../components/Gradient'

export const Statistics: React.FC = () => {
  const [timeRange, setTimeTange] = useState<TimeRange>('thisMonth')

  return (
    <div>
      <Gradient>
        <TopNav title='账目列表' icon={<Icon name='back' />} />
      </Gradient>
      <TopTimeBar selected={timeRange} onSelect={setTimeTange}/>
  </div>
  )
}
