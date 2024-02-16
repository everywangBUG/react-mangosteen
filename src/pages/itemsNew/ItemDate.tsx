import { useState } from 'react'
import { usePopup } from '../../hooks/usePopup'
import { DatePicker } from '../../components/DatePicker'
import { Icon } from '../../components/Icon'
import { time } from '../../lib/time'

export const ItemDate: React.FC = () => {
  const { popup, toggle, closePopup } = usePopup({
    children: <DatePicker onConfirm={d => { setDate(d); closePopup() }} onCancel={() => closePopup()} />
  })

  const [date, setDate] = useState(new Date())

  return (
    <>
      <span flex items-center gap-x-8px onClick={toggle}>
        <Icon className="h-24px w-24px" name="calendar" grow-0 shrink-0 />
        <span grow-0 shrink-0 text-14px text="gray">{time(date).format()}</span>
      </span>
      {popup}
    </>
  )
}
