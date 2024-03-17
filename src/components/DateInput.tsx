import { usePopup } from '../hooks/usePopup'
import { time } from '../lib/time'
import { DatePicker } from './DatePicker'

type Props = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export const DateInput: React.FC<Props> = (props) => {
  const { value, placeholder, onChange } = props

  const { popup, toggle, closePopup } = usePopup({
    children: <DatePicker onConfirm={d => { onChange?.(time(d).toISOString); closePopup() }} onCancel={() => closePopup()} />
  })
  return (
    <div>
      {popup}
      <input j-input-text type='text'
            placeholder={placeholder}
            value={value}
            onChange={e => onChange?.(e.target.value)}
            readOnly
            onClick={toggle}
          />
    </div>
  )
}
