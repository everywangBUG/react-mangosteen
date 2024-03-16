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

const compareKey = <T extends (string | { name: string })>(key1: T, key2: T) => {
  if (typeof key1 === 'string' && typeof key2 === 'string') {
    return key1 === key2
  } else if (key1 instanceof Object && key2 instanceof Object) {
    return key1.name === key2.name
  } else {
    return false
  }
}
export const Tabs = <T extends string | { name: string }>(props: Props<T>) => {
  const { tabItems, selected, onChange, className, classPrefix } = props
  return (
    <div className={cs(className, classPrefix)}>
      <ol flex children-px-16px children-pb-8px text-white children-text-14px grow-0 shrink-0 bg="[rgba(255,149,0,1)]"
        className={classPrefix ? `${classPrefix}-menu` : ''}
      >
        {
          tabItems.map(it =>
          <li key={ typeof it.key === 'string' ? it.key : it.key.name} onClick={() => onChange(it.key)} className={
            cs(compareKey(selected, it.key.name) ? s.selected : '',
              classPrefix ? `${classPrefix}-menu-item` : ''
            )}>
            { it.value }
          </li>)
        }
      </ol>
      <div grow-1 shrink-1 overflow-auto h="90%" className={classPrefix ? `${classPrefix}-pane` : ''}>
        {tabItems.filter(it => compareKey(selected, it.key.name))[0]?.element}
        { /* DOM diff算法 */}
        { /* 1. 组件名是否一致 Tags => Tags 一致不删除组件，只更新属性 */}
      </div>
    </div>
  )
}
