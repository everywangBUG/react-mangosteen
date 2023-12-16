import s from './TopTimeBar.module.scss'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'thisYear' | 'customTime'
interface Props {
  selected: TimeRange
  onSelected: (selected: TimeRange) => void
}
const timeRanges: { key: TimeRange; value: string }[] = [
  { key: 'thisMonth', value: '本月' },
  { key: 'lastMonth', value: '上月' },
  { key: 'thisYear', value: '今年' },
  { key: 'customTime', value: '自定义时间' }
]
export const TopTimeBar: React.FC<Props> = ({ selected, onSelected }) => {
  return (
    <>
      <ol flex children-px-16px children-pb-8px text-white cursor-pointer>
        {
          timeRanges.map(it =>
          <li key={ it.key} onClick={() => onSelected(it.key)} className={selected === it.key ? s.selected : ''}>
            { it.value }
          </li>)
        }
      </ol>
    </>
  )
}
