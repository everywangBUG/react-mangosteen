import { useRef, useState } from "react"
import { time } from "../library/Time"

interface Props {
  start?: Date
  end?: Date
  value?: Date | string
  onCancel?: () => void
  onConfirm?: (value: Date) => void
}

const getNow = () => time().set({ seconds: 0, ms: 0 })
export const DatePicker: React.FC<Props> = (props) => {
  const { start, end, value, onConfirm, onCancel } = props
  const [_, update] = useState({})
  const startTime = start ? time(start) : time().add(-10, "year")
  const endTime = end ? time(end) : time().add(10, "year")
  const valueTime = useRef(value ? time(value) : getNow())
  if (startTime.year > endTime.year) {
    throw new Error("startTime must be less than endTime")
  }
  const yearList = Array.from({length: endTime.year - startTime.year + 1}).map((_, index) => startTime.year + index)
  const monthList = Array.from({length: 12}).map((_, index) => index + 1)
  const dayList = Array.from({length: valueTime.current.lastDayOfMonth.day}).map((_, index) => index + 1)
  const pad = (num: number) => (num < 10 ? `0${num}` : num)
  const hourList = Array.from({length: 24}).map((_, index) => Number(pad(index)))
  const minuteList = Array.from({length: 60}).map((_, index) => Number(pad(index)))
  return (
    <div w-full h-full flex bg-white flex-col rounded-t-16px>
      <div flex justify-between p-16px>
        <span onClick={onCancel}>取消</span>
        <span>时间选择</span>
        <span onClick={() => onConfirm?.(valueTime.current.date)}>确定</span>
      </div>
      <div flex children-grow-1 justify-evenly p-16px children-text-center>
        <span>年</span>
        <span>月</span>
        <span>日</span>
        <span>时</span>
        <span>分</span>
      </div>
      <div flex grow-1 p-16px overflow-hidden>
        <Column className="grow-1" items={yearList} value={valueTime.current.year} onChange={year => {valueTime.current.year = year; update({})}} />
        <Column className="grow-1" items={monthList} value={valueTime.current.month} onChange={month => {valueTime.current.month = month; update({})}} />
        <Column className="grow-1" items={dayList} value={valueTime.current.day} onChange={day => {valueTime.current.day = day; update({})}} />
        <Column className="grow-1" items={hourList} value={valueTime.current.hours} onChange={hours => {valueTime.current.hours = hours; update({})}} />
        <Column className="grow-1" items={minuteList} value={valueTime.current.minutes} onChange={minutes => {valueTime.current.minutes = minutes; update({})}} />
      </div>
    </div>
  )
}

interface ColumnProps {
  className?: string
  height?: number
  items: number[]
  value: number
  onChange: (value: number) => void
}

export const Column: React.FC<ColumnProps> = (props) => {
  const [isTouching, setIsTouching] = useState(false)
  const { height = 40, className, items, value, onChange } = props

  const [lastY, setLastY] = useState(-1)

  const defaultYearIndex = items.indexOf(value)
  const [translateY, _setTranslateY] = useState(-defaultYearIndex * height)
  const setTranslateY = (y: number) => {
    // if (y > 0) {
    //   y = 0
    // }
    y = Math.min(y, 0)
    // if (y < (yearList.length - 1) * -height) {
    //   y = -(yearList.length - 1) * -height
    // }
    y = Math.max(y, (items.length - 1) * -height)
    _setTranslateY(y)
  }

  return (
    <div
      className={className}
      relative
      h-50vh
      onTouchStart={
        (e) => {
          setIsTouching(true)
          setLastY(e.touches[0].clientY)
        }
      }
      onTouchMove={
        (e) => {
          if (isTouching) {
            const y = e.touches[0].clientY
            const currentY = y - lastY
            setTranslateY(translateY + currentY)
            setLastY(y)
          }
        }
      }
      onTouchEnd={
        () => {
          const reminder = translateY % height
          if (reminder > 0) {
            if (reminder < height / 2) {
              setTranslateY(translateY - reminder)
            } else {
              setTranslateY(translateY + height - reminder)
            }
          } else {
            if (reminder < -height / 2) {
              setTranslateY(translateY - height - reminder)
            } else {
              setTranslateY(translateY - reminder)
            }
          }
          setIsTouching(false)
          onChange(items[Math.abs((translateY - reminder) / height)])
        }
      }
    >
      <div w-full b-t-1px b-b-1px b-orange b-solid absolute top="50%" style={{height, transform: `translateY(${-height}px)`}}></div>
      <div w-full text-center absolute top="50%" style={{transform: `translateY(${-height}px)`}}>
        <ol style={{transform: `translateY(${translateY}px)`}}>
          {
            items.map((item) => (
              <li key={item} style={{height, lineHeight: `${height}px`}}>
                {item}
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}
