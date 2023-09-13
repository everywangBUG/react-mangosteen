import { Icon } from './Icon'

interface IProps {
  name: string
  title?: string
}

export const TopNav: React.FC<IProps> = ({ name, title }) => {
  return (
    <div flex items-center text-white p-16px>
      <Icon name={name} className="w-24px h24px"/>
      <h1 text-24px ml-16px>{title}</h1>
    </div>
  )
}
