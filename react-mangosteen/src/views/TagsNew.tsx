import { useRef,useEffect  } from "react"
import { Calendar, CalendarRef } from "../components/Calendar/Calendar"
import { time } from "../library/Time"

export const TagsNew: React.FC = () => {
  const calendarRef = useRef<CalendarRef>(null)

  useEffect(() => {
    setTimeout(() => {
      calendarRef.current?.setDate(time("2023-01-01"))
    }, 3000)
  }, [])

  return (
    <div>
      {/* <Calendar ref={calendarRef} defaultValue={time("2023-01-01")} onChange={(date) => alert(date.toLocaleDateString())} /> */}
      <Calendar ref={calendarRef} defaultValue={time("2022-12-10")}/>
    </div>
  )
}
