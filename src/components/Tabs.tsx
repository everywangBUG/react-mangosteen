import type { ReactNode } from 'react'
import cs from 'classnames'
import s from './Tabs.module.scss'

interface Props<T> {
  tabItems: {
    key: T
    value: string
    element?: ReactNode
  }[]
  selected: string
  onChange: (key: T) => void
  className?: string
  classPrefix?: string
}

export const Tabs = <T extends string>(props: Props<T>) => {
  const { tabItems, selected, onChange, className, classPrefix } = props
  return (
    <div className={cs(className, classPrefix)}>
      <ol flex children-px-16px children-pb-8px text-white children-text-14px grow-0 shrink-0 bg="[rgba(255,149,0,1)]"
        className={classPrefix ? `${classPrefix}-menu` : ''}
      >
        {
          tabItems.map(it =>
          <li key={ it.key} onClick={() => onChange(it.key)} className={
            cs(selected === it.key ? s.selected : '',
              classPrefix ? `${classPrefix}-menu-item` : ''
            )}>
            { it.value }
          </li>)
        }
      </ol>
      <div grow-1 shrink-1 overflow-auto h="100%" className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(it => it.key === selected)[0]?.element}
      </div>
    </div>
  )
}
