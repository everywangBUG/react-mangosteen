import s from "./Tabs.module.scss"


interface Props<T> {
  tabItems: {
    key: T
    value: string
  }[]
  value: T
  onChange: (key: T) => void
}

export const Tabs = <T extends string | { name: string }>(props: Props<T>) => {
  const { tabItems, value, onChange } = props
  return (
    <ol flex children-py-8px children-px-16px text-white>
      {
        tabItems.map(item => {
          return(
            <li
              key={item.value}
              className={item.key === value ? s.active : " "}
              onClick={() => { onChange(item.key) }}
            >
              {item.value}
            </li>
          )
        })
      }
    </ol>
  )
}
