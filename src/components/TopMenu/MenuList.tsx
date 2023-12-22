import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'

interface Props {
  className?: string
}

const MyIcon = styled(Icon)`
    width: 32px;height: 32px;margin-right: 16px;
`

const items = [
  { key: 'chart', icon: 'chart', text: '统计图表', to: '/chart' },
  { key: 'export', icon: 'export', text: '导出数据', to: '/export' },
  { key: 'tags', icon: 'category', text: '自定义标签', to: '/tags' },
  { key: 'noty', icon: 'noty', text: '记账提醒', to: '/noty' }
]

export const MenuList: React.FC<Props> = ({ className }) => {
  return (<div h-screen>
    <ul className={className} bg-white text-20px py-16px h-full>
        {
          items.map(it => (
            <li key={it.key}>
              <NavLink to={it.to} flex items-center mb-16px py-8px px-16px>
                <MyIcon name={it.icon}/>{it.text}
              </NavLink>
            </li>
          ))
        }
    </ul>
  </div>)
}
