import { useState } from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Gradient } from '../../components/Gradient'
import { TopNav } from '../../components/TopNav'
import { Icon } from '../../components/Icon'
import { Tabs } from '../../components/Tabs'

const StyledTabs = styled(Tabs)`
  .tabs-menu {}
  .tabs-menu-item {
    flex: 1;
  }
  .tabs-pane {
    border: 1px solid red;
  }
`

export type ExpendIncome = 'expenses' | 'income'

const itemsNewArr: { key: ExpendIncome; value: string; element: ReactNode }[] = [
  { key: 'expenses', value: '支出', element: <span>支出</span> },
  { key: 'income', value: '收入', element: <span>收入</span> }
]

export const ItemsNew: React.FC = () => {
  const [tabItem, setTabItem] = useState<ExpendIncome>('expenses')
  return (
    <>
      <Gradient>
        <TopNav title='记一笔' icon={<Icon name="back" className="w-24px h-24px" />} />
      </Gradient>
      <StyledTabs
        tabItems={itemsNewArr}
        selected={tabItem}
        onChange={(tabItem) => setTabItem(tabItem as ExpendIncome) }
        className='text-center' classPrefix="tabs"
      />
    </>
  )
}
