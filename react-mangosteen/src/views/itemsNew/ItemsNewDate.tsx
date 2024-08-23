import { DatePicker } from "../../components/DatePicker"
import { Icon } from "../../components/Icon"
import { time } from "../../library/Time"
import { usePopup } from "../../hooks/usePopup"

interface Props {
  className?: string
  value?: Date | string
  onChange?: (date: string) => void
}

export const ItemsNewDate: React.FC<Props> = (props) => {
  const { className, onChange, value } = props
  const { popup, openPopup, closePopup} = usePopup({
    isShow: false,
    children: <DatePicker onCancel={() => closePopup()} onConfirm={d => { onChange?.(time(d).toISOString); closePopup() }} value={value}/>,
    position: "bottom"
  })

  const popupCalendar = () => {
    openPopup()
  }
  
  return (
    <div className={className}>
      <div gap-x-8px flex items-center>
        <Icon name="calendar" onClick={popupCalendar} className={"w-24px h-24px"} />
        <span text-gray>{time(value).format("yyyy-MM-dd HH:mm")}</span>
      </div>
      {popup}
    </div>
  )
}
