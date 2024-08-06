import React from "react"
import s from "./Tabs.module.scss"
import cs from "classnames"

interface Props<T> {
  tabItems: {
    key: T
    value: string
    element?: React.ReactNode
  }[]
  value: T
  onChange: (key: T) => void
  className?: string
  classPrefix?: string
}
  
export const Tabs = <T extends string | { name: string }>(props: Props<T>) => {
  const { tabItems, value, onChange, className, classPrefix } = props
  return (
    <>
      <ol flex children-py-8px children-px-16px text-white mt="-1px" bg="[rgba(255,149,0,1)]" className={className}>
        {
          tabItems.map(item => {
            return(
              <li
                key={item.value}
                className={cs(item.key === value ? s.active : "", classPrefix ? `${classPrefix}-menu-item` : "")}
                onClick={() => { onChange(item.key) }}
              >
                {item.value}
              </li>
            )
          })
        }
      </ol>
      <div className={classPrefix ? `${classPrefix}-pane` : ""} >
        {tabItems.find(item => item.key === value)?.element}
      </div>
    </>
  )
}