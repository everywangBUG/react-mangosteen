import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Tabs } from '../components/Tabs'
import { useCreateItems } from '../stores/useCreateItems'
import { hasError, validate } from '../lib/validate'
import { useAjax } from '../lib/ajax'
import { BackIcon } from '../components/BackIcon'
import { time } from '../lib/time'
import { ItemDate } from './itemsNew/ItemDate'
import s from './ItemsNew.module.scss'
import { Tags } from './itemsNew/Tags'
import { ItemAmount } from './itemsNew/ItemAmount'

export const ItemsNew: React.FC = () => {
  const { post } = useAjax({ showLoading: true, handleError: true })
  const navigator = useNavigate()
  const { data, setData, setError } = useCreateItems()
  const itemsNewArr: { key: ExpendIncome; value: string; element: ReactNode }[] = [
    { key: 'expenses', value: '支出', element: <Tags kind="expenses" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} /> },
    { key: 'income', value: '收入', element: <Tags kind="income" value={data.tag_ids} onChange={(ids) => setData({ tag_ids: ids })} /> }
  ]
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const error = validate(data, [
      { key: 'kind', type: 'required', message: '请选择类型' },
      { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
      { key: 'happen_at', type: 'required', message: '请选择一个时间' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' },
    ])
    setError(error)
    if (hasError(error)) {
      const errorMessage = Object.values(error).flat().join('\n')
      window.alert(errorMessage)
    } else {
      await post<IResources<Tag>>('/api/v1/items', data)
      setData({ amount: 0, happen_at: time().toISOString })
      navigator('/items')
    }
  }

  return (
    <form className={s.wrapper} h-screen flex flex-col onSubmit={onSubmit}>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='记一笔' icon={<BackIcon />} />
      </Gradient>
      <Tabs
        tabItems={itemsNewArr}
        selected={data.kind!}
        onChange={(tabItem) => { setData({ kind: tabItem }) }}
        className='text-center grow-1 shrink-1 overflow-hidden'
        classPrefix="tabs"
      />
      <ItemAmount className="grow-0 shrink-0" value={data.amount} onChange={(amount) => setData({ amount })}
        itemDate={<ItemDate value={data.happen_at} onChange={(happen_at) => setData({ happen_at })}/>}
      />
    </form>
  )
}
