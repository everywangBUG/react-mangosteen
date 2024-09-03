import { useEffect, useState } from "react"
import { Time, time } from "../../library/Time"

export const Calendar: React.FC = () => {
  const [date, setDate] = useState<Time>(time())

  const handlePreMonth = () => {
    setDate(date.add(-1, "month").clone)
  }
  
  const handleNextMonth = () => {
    setDate(date.add(1, "month").clone)
  }

  const renderDates = () => {
    const days = []
    const dayCount = date.dayCountOfMonth
    const firstDayOfMonth = date.firstDayOfMonth.day
    // 渲染空白
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={i} className="day" />)
    }
    for (let i = 0; i < dayCount; i++) {
      days.push(<div key={i} className={`day ${i === 0 ? "first" : ""}`}>{i + 1}</div>)
    }
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
