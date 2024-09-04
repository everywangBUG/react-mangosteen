import React, { useImperativeHandle, useState } from "react"
import { Time, time } from "../../library/Time"

interface CalendarProps {
  defaultValue?: Time
  onChange?: (date: Date) => void
}

export interface CalendarRef {
  getDate: () => Time
  setDate: (date: Time) => void
}

export const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
  const { defaultValue = time(), onChange } = props
  const [date, setDate] = useState<Time>(defaultValue)
  const [selectedDate, setSelectedDate] = useState<Time | null>(defaultValue)

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date
      },
      setDate(date: Time) {
        setDate(date)
      }
    }
  })

  const handlePreMonth = () => {
    setDate(date.add(-1, "month").clone)
  }
  
  const handleNextMonth = () => {
    setDate(date.add(1, "month").clone)
  }

  const renderDates = () => {
    const days: JSX.Element[] = []
    const dayCount = date.dayCountOfMonth
    const firstDayWeek = date.firstDayOfMonth.week
    Array.from({length: firstDayWeek}).forEach((_, i) => {
      days.push(<div key={i}></div>)
    }) 
    Array.from({length: dayCount}).forEach((_, i) => {
      const curDate = date.clone.set({ day: i + 1 })
      const selected = curDate.timestamp === (selectedDate?.timestamp ?? defaultValue.timestamp)
      const handleClickDate = () => {
        onChange?.(curDate.date)
        setDate(curDate)
        setSelectedDate(curDate)
      }
      days.push(
        <div
          key={i + dayCount}
          className={selected ? "bg-blue-400 text-white" : ""}
          onClick={handleClickDate}
        >
          {i + 1}
        </div>)
    })
    return days
  }

  return (
    <div>
      <header flex justify-between items-center p-16px>
        <span b-1 b-gray b-solid rounded-4px p-8px onClick={handlePreMonth}>&lt;</span>
        <span>{date.format("yyyy年MM月")}</span>
        <span b-1 b-gray b-solid rounded-4px p-8px onClick={handleNextMonth}>&gt;</span>
      </header>
      <main w-screen children-w="[calc(100%/7)]" flex text-center>
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </main>
      <footer w-screen children-w="[calc(100%/7)]" flex flex-wrap text-center children-p-y-8px>
        {renderDates()}
      </footer>
    </div>
  )
}

export const Calendar = React.forwardRef(InternalCalendar)
