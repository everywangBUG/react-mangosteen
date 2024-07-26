import type { ReactNode } from "react"

interface Props {
  icon: ReactNode
  title: string
}

export const TopNav: React.FC<Props> = ({icon, title}) => {
  return (
    <div flex items-center text-white p-16px>
      <span mr-8px flex items-center>{icon}</span>
      <h1 text-24px>{title}</h1>
    </div>
  )
}
