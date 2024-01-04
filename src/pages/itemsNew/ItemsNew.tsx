import { Gradient } from '../../components/Gradient'
import { TopNav } from '../../components/TopNav'
import { Icon } from '../../components/Icon'
import { Tabs } from '../../components/Tabs'

type ExpendIncome = 'expend' | 'income'

const itemsNew: { key: ExpendIncome; value: string }[] = [
  { key: 'expend', value: '支出' },
  { key: 'income', value: '收入' }
]

interface Props {
  selected: ExpendIncome
  onSelect: (selected: ExpendIncome) => void
}

export const ItemsNew: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <>
      <Gradient>
        <TopNav title='记一笔' icon={<Icon name="back" className="w-24px h-24px" />} />
        <Tabs tabItems={itemsNew} selected={selected} onChange={onSelect} />
      </Gradient>
    </>
  )
}
