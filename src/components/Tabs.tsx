import s from './Tabs.module.scss'

interface Props<T> {
  tabItems: {
    key: T
    value: string
  }[]
  selected: string
  onChange: (key: T) => void
  className?: string
}

export const Tabs = <T extends string>(props: Props<T>) => {
  const { tabItems, selected, onChange, className } = props
  return (<div>
     <ol className={className} flex children-px-16px children-pb-8px text-white children-text-14px>
        {
          tabItems.map(it =>
          <li key={ it.key} onClick={() => onChange(it.key)} className={selected === it.key ? s.selected : ''}>
            { it.value }
          </li>)
        }
      </ol>
  </div>)
}
