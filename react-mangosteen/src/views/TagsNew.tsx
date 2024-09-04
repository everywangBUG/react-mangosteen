import { useRef, useEffect, useState  } from "react"
import { Calendar, CalendarRef } from "../components/Calendar/Calendar"
import { Time, time } from "../library/Time"

export const TagsNew: React.FC = () => {
  // 受控模式
  const [date, setDate] = useState<Time | Date>(time())
  // 非受控模式
  const calendarRef = useRef<CalendarRef>(null)

  useEffect(() => {
    setTimeout(() => {
      calendarRef.current?.setDate(time("2023-01-01"))
    }, 3000)
  }, [])

  return (
    <div>
      {/* 非受控用法 */}
      <Calendar ref={calendarRef} defaultValue={time("2023-01-01")} onChange={(date) => console.log(date)} />
      {/* 非受控用法可以不传onChange，但是会丢失onChange的回调 */}
      <Calendar ref={calendarRef} defaultValue={time("2022-12-10")} />
      {/* 受控用法 */}
      <Calendar value={date} onChange={(newDate) => {setDate(newDate);}} />
    </div>
  )
}
