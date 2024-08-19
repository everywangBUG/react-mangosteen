import { DatePicker } from "../../components/DatePicker"
import { Icon } from "../../components/Icon"
import { time } from "../../library/Time"
import { usePopup } from "../../hooks/usePopup"

interface Props {
  className?: string
  onConfirm?: (date: Date) => void
}

export const TagsDate: React.FC<Props> = (props) => {
  const { className, onConfirm } = props 
  const { popup, openPopup, closePopup} = usePopup({
    isShow: false,
    children: <DatePicker onCancel={() => closePopup()} onConfirm={() => { onConfirm; closePopup() }}/>,
    position: "bottom"
  })

  const popupCalendar = () => {
    openPopup()
  }
  
  return (
    <div className={className}>
      <div gap-x-8px flex items-center>
        <Icon name="calendar" onClick={popupCalendar} className={"w-24px h-24px"} />
        <span text-gray>{time().format("yyyy-MM-dd HH:mm:ss")}</span>
      </div>
      {popup}
    </div>
  )
}
