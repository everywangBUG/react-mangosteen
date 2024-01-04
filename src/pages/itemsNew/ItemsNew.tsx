import { useState } from 'react'
import type { ReactNode } from 'react'
import { Gradient } from '../../components/Gradient'
import { TopNav } from '../../components/TopNav'
import { Icon } from '../../components/Icon'
import { Tabs } from '../../components/Tabs'
import s from './ItemsNew.module.scss'

export type ExpendIncome = 'expenses' | 'income'

const itemsNewArr: { key: ExpendIncome; value: string; element: ReactNode }[] = [
  { key: 'expenses', value: '支出', element: <span>支出</span> },
  { key: 'income', value: '收入', element: <span>收入</span> }
]

export const ItemsNew: React.FC = () => {
  const [tabItem, setTabItem] = useState<ExpendIncome>('expenses')
  return (
    <div className={s.wrapper}>
      <Gradient>
        <TopNav title='记一笔' icon={<Icon name="back" className="w-24px h-24px" />} />
      </Gradient>
      <Tabs
        tabItems={itemsNewArr}
        selected={tabItem}
        onChange={(tabItem) => setTabItem(tabItem as ExpendIncome) }
        className='text-center' classPrefix="tabs"
      />
    </div>
  )
}
