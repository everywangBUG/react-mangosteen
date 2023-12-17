import c from 'classnames'
import s from './icon.module.scss'

interface IProps {
  className?: string
  name: string
  onClick?: (e: React.MouseEvent) => void
}

export const Icon: React.FC<IProps> = ({ name, className, onClick }) => {
  return (
    <svg className={c(className, s.icon)} onClick={onClick}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
