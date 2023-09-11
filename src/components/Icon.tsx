import c from 'classnames'
import s from './icon.module.scss'

interface IProps {
  className?: string
  name: string
}

export const Icon: React.FC<IProps> = ({ name, className }) => {
  return (
    <svg className={c(className, s.icon)}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
