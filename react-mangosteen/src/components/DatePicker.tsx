import { useState } from "react"
import { time } from "../library/Time"

interface Props {
  start?: Date
  end?: Date
  value?: Date
  height?: number
}

export const DatePicker: React.FC<Props> = (props) => {
  const [isTouching, setIsTouching] = useState(false)
  const { start, end, value, height = 40 } = props

  const [lastY, setLastY] = useState(-1)
  const startTime = start ? time(start) : time().add(-10, "year")
  const endTime = end ? time(end) : time().add(10, "year")
  const yearList = Array.from({length: endTime.year - startTime.year + 1}).map((_, index) => startTime.year + index)
  const defaultYearIndex = yearList.indexOf(value ? time(value).year : time().year)
  const [translateY, _setTranslateY] = useState(-defaultYearIndex * height)
  const setTranslateY = (y: number) => {
    // if (y > 0) {
    //   y = 0
    // }
    y = Math.min(y, 0)
    // if (y < (yearList.length - 1) * -height) {
    //   y = -(yearList.length - 1) * -height
    // }
    y = Math.max(y, (yearList.length - 1) * -height)
    _setTranslateY(y)
  }

  return (
    <div
      w-full
      relative
      h-50vh
      bg-white
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
            yearList.map((year) => (
              <li key={year} style={{height, lineHeight: `${height}px`}}>
                {year}
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}
