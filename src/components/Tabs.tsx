import s from './Tabs.module.scss'

interface Props<T> {
  tabItems: {
    key: T
    value: string
  }[]
  selected: string
  onChange: (key: T) => void
}

export const Tabs = <T extends string>(props: Props<T>) => {
  const { tabItems, selected, onChange } = props
  return (<div>
     <ol flex children-px-16px children-pb-8px text-white cursor-pointer>
        {
          tabItems.map(it =>
          <li key={ it.key} onClick={() => onChange(it.key)} className={selected === it.key ? s.selected : ''}>
            { it.value }
          </li>)
        }
      </ol>
  </div>)
}
