import { useState } from 'react'
import type { ReactNode } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { useCreateItems } from '../stores/useCreateItems'
import s from './ItemsNew.module.scss'
import { Tags } from './itemsNew/Tags'
import { DateAndAmount } from './itemsNew/DateAndAmount'

const itemsNewArr: { key: ExpendIncome; value: string; element: ReactNode }[] = [
  { key: 'expenses', value: '支出', element: <Tags kind="expenses" /> },
  { key: 'incomes', value: '收入', element: <Tags kind="incomes" /> }
]

export const ItemsNew: React.FC = () => {
  const [tabItem, setTabItem] = useState<ExpendIncome>('expenses')
  const { data, error, setData, setError } = useCreateItems()
  return (
    <div className={s.wrapper} h-screen flex flex-col>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='记一笔' icon={<Icon name="back" className="w-24px h-24px" />} />
      </Gradient>
      <Tabs
        tabItems={itemsNewArr}
        selected={data.kind!}
        onChange={(tabItem) => { setData({ kind: tabItem }) }}
        className='text-center grow-1 shrink-1 overflow-hidden'
        classPrefix="tabs"
      />
      <DateAndAmount className="grow-0 shrink-0"/>
    </div>
  )
}
