import type { ReactNode } from 'react'

interface IProps {
  title?: string
  icon: ReactNode
}

export const TopNav: React.FC<IProps> = ({ title, icon }) => {
  return (
    <div flex items-center text-white p-16px>
      <span flex w-24px h24px children-max-w="100%" children-max-h="100%">
        {icon}
      </span>
      <h1 text-24px ml-16px>{title}</h1>
    </div>
  )
}
