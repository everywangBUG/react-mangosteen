import { useState } from 'react'
import { Gradient } from '../../components/Gradient'
import { TopNav } from '../../components/TopNav'
import { Icon } from '../../components/Icon'
import { Tabs } from '../../components/Tabs'

export type ExpendIncome = 'expenses' | 'income'

const itemsNewArr: { key: ExpendIncome; value: string }[] = [
  { key: 'expenses', value: '支出' },
  { key: 'income', value: '收入' }
]

export const ItemsNew: React.FC = () => {
  const [tabItem, setTabItem] = useState<ExpendIncome>('expenses')
  return (
    <>
      <Gradient>
        <TopNav title='记一笔' icon={<Icon name="back" className="w-24px h-24px" />} />
        <Tabs tabItems={itemsNewArr} selected={tabItem} onChange={(item) => setTabItem(item) } className='children-flex-1 text-center'/>
      </Gradient>
    </>
  )
}
