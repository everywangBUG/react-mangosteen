import { useState } from 'react'
import { time } from '../lib/time'

export const DatePicker: React.FC = () => {
  return (
    <div flex>
      <Column className="grow-1" />
      <Column className="grow-1" />
      <Column className="grow-1"/>
    </div>
  )
}

type ColumnProps = {
  start?: Date
  end?: Date
  value?: Date
  itemHeight?: number
  className?: string
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { start, end, value, itemHeight = 36, className } = props
  const startTime = start ? time(start) : time().add(-10, 'years')
  const endTime = end ? time(end) : time().add(10, 'years')
  const valueTime = value ? time(value) : time()
  if (endTime.timestamp < startTime.timestamp) {
    throw new Error('end time must be greater than start time')
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 }).map((_, index) => startTime.year + index)
  const index = yearList.indexOf(valueTime.year)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, _setTranslateY] = useState(-index * itemHeight)
  const setTranslateY = (y: number) => {
    // if (y > 0) { y = 0 }
    // if (y < -(yearList.length - 1) * itemHeight) { y = -(yearList.length - 1) * itemHeight }
    y = Math.min(y, 0)
    y = Math.max(y, -(yearList.length - 1) * itemHeight)
    _setTranslateY(y)
  }

  return (
    <div
      className={className}
      overflow="hidden"
      h="50vh"
      relative
      onTouchStart={(e) => {
        setIsTouching(true)
        setLastY(e.touches[0].clientY)
      }}
      onTouchMove={(e) => {
        if (isTouching) {
          const y = e.touches[0].clientY
          const dy = y - lastY
          setTranslateY(translateY + dy)
          setLastY(y)
        }
      }}
      onTouchEnd={() => {
        const remainder = translateY % itemHeight
        if (Math.abs(remainder) < 18) {
          setTranslateY(translateY - remainder)
        }
        else {
          setTranslateY(translateY - remainder + itemHeight * Math.sign(remainder))
        }
        setIsTouching(false)
      }}
    >
      <div border-b-2px border-t-2px b="#eee" absolute w-full top="50%" style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2})` }} />
      <div border-b-2px border-t-2px b="#eee" absolute w-full top="50%" style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2})` }} >
        <ol flex flex-col text-center children-flex children-items-center children-justify-center
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {yearList.map(item => <li style={{ height: itemHeight }} key={item}>{item}</li>) }
        </ol>
    </div>
  </div>
  )
}
