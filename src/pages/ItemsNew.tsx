import type { ReactNode } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { useCreateItems } from '../stores/useCreateItems'
import { ItemDate } from './itemsNew/ItemDate'
import s from './ItemsNew.module.scss'
import { Tags } from './itemsNew/Tags'
import { DateAndAmount } from './itemsNew/DateAndAmount'

export const ItemsNew: React.FC = () => {
  const { data, error, setData, setError } = useCreateItems()
  const itemsNewArr: { key: ExpendIncome; value: string; element: ReactNode }[] = [
    { key: 'expenses', value: '支出', element: <Tags kind="expenses" value={data.tag_ids} onChange={ (ids) => setData({ tag_ids: ids }) }/> },
    { key: 'incomes', value: '收入', element: <Tags kind="incomes" value={data.tag_ids} onChange={ (ids) => setData({ tag_ids: ids }) }/> }
  ]
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
      <div>{JSON.stringify(data)}</div>
      <DateAndAmount className="grow-0 shrink-0" itemDate={<ItemDate />} />
    </div>
  )
}
