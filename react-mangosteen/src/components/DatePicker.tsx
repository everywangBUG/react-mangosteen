import { useRef, useState } from "react"
import { time } from "../library/Time"

interface Props {
  start?: Date
  end?: Date
  value?: Date
}

export const DatePicker: React.FC<Props> = (props) => {
  const { start, end, value, } = props
  const startTime = start ? time(start) : time().add(-10, "year")
  const valueTime = useRef(value ? time(value) : time())
  const endTime = end ? time(end) : time().add(10, "year")
  const yearList = Array.from({length: endTime.year - startTime.year + 1}).map((_, index) => startTime.year + index)
  const monthList = Array.from({length: 12}).map((_, index) => index + 1)
  const dayList = Array.from({length: valueTime.current.lastDayOfMonth.day}).map((_, index) => index + 1)
  return (
    <div w-full h-full flex bg-white>
      <Column className="grow-1" items={yearList} value={valueTime.current.year} />
      <Column className="grow-1" items={monthList} value={valueTime.current.month} />
      <Column className="grow-1" items={dayList} value={valueTime.current.day} />
    </div>
  )
}

interface ColumnProps {
  className?: string
  height?: number
  items: number[]
  value: number
}

export const Column: React.FC<ColumnProps> = (props) => {
  const [isTouching, setIsTouching] = useState(false)
  const { height = 40, className, items, value } = props

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
            if (reminder < -height /2) {
              setTranslateY(translateY - height - reminder)
            } else {
              setTranslateY(translateY - reminder)
            }
          }
          setIsTouching(false)
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
