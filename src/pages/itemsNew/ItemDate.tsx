import { usePopup } from '../../hooks/usePopup'
import { DatePicker } from '../../components/DatePicker'
import { Icon } from '../../components/Icon'
import { time } from '../../lib/time'

type Props = {
  value: string | Date
  onChange: (date: string) => void
}

export const ItemDate: React.FC<Props> = (props) => {
  const { value, onChange } = props
  const { popup, toggle, closePopup } = usePopup({
    children: <DatePicker onConfirm={d => { onChange?.(time(d).toISOString); closePopup() }} onCancel={() => closePopup()} />
  })

  return (
    <>
      <span flex items-center gap-x-8px onClick={toggle}>
        <Icon className="h-24px w-24px" name="calendar" grow-0 shrink-0 />
        <span grow-0 shrink-0 text-14px text="gray">{time(value).format()}</span>
      </span>
      {popup}
    </>
  )
}
