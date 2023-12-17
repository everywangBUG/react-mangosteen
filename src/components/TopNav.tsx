import { useContext } from 'react'
import { menuContext } from '../contexts/menuContext'
import { Icon } from './Icon'

interface IProps {
  name: string
  title?: string
}

export const TopNav: React.FC<IProps> = ({ name, title }) => {
  const { setVisible } = useContext(menuContext)
  return (
    <div flex items-center text-white p-16px>
      <Icon name={name} className="w-24px h24px"
        onClick={() => {
          setVisible(true)
        }}
      />
      <h1 text-24px ml-16px>{title}</h1>
    </div>
  )
}
