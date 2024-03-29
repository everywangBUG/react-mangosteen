import { useEffect, useRef, useState } from 'react'
import { time } from '../lib/time'

type Props = {
  start?: Date
  end?: Date
  value?: Date
  onCancel?: () => void
  onConfirm?: (value: Date) => void
}

const getNow = () => time().set({ seconds: 0, ms: 0 })
// useRef+forcedate强制更新方案
export const DatePicker: React.FC<Props> = (props) => {
  const { start, end, value, onCancel, onConfirm } = props
  const startTime = start ? time(start) : getNow().add(-10, 'years')
  const endTime = end ? time(end) : getNow().add(10, 'year')
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('end time must be greater than start time')
  }
  // 使用useRef阻止valueTime重复申明
  const [, update] = useState({})
  const valueTime = useRef(value ? time(value) : getNow())
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({ length: valueTime.current.lastDayOfMonth.day }).map((_, index) => index + 1)
  const hourList = Array.from({ length: 24 }).map((_, index) => index)
  const minList = Array.from({ length: 60 }).map((_, index) => index)
  return (
    <div >
      <div p-8px flex justify-between border-b-2px b="#f3f3f3" children-p-8px>
        <span onClick={onCancel}>取消</span>
        <span>时间选择</span>
        <span onClick={() => onConfirm?.(valueTime.current.date)}>确定</span>
      </div>
      <div flex children-grow-1 text-center children-p-16px>
        <span>年</span>
        <span>月</span>
        <span>日</span>
        <span>时</span>
        <span>分</span>
      </div>
      <div flex p-8px>
        <Column className="grow-1" items={yearList} value={valueTime.current.year} onChange={year => { valueTime.current.year = year; update({}) }} />
        <Column className="grow-1" items={monthList} value={valueTime.current.month} onChange={month => { valueTime.current.month = month; update({}) }} />
        <Column className="grow-1" items={dayList} value={valueTime.current.day} onChange={day => { valueTime.current.day = day; update({}) }} />
        <Column className="grow-1" items={hourList} value={valueTime.current.hours} onChange={hours => { valueTime.current.hours = hours; update({}) }} />
        <Column className="grow-1" items={minList} value={valueTime.current.minutes} onChange={minutes => { valueTime.current.minutes = minutes; update({}) }} />
      </div>
    </div>
  )
}

type ColumnProps = {
  itemHeight?: number
  className?: string
  items: number[]
  value: number
  onChange: (value: number) => void
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { itemHeight = 36, className, items, value, onChange } = props
  useEffect(() => {
    const index = items.indexOf(value)
    setTranslateY(-index * itemHeight)
  }, [value])
  const index = items.indexOf(value)
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, _setTranslateY] = useState(-index * itemHeight)
  const setTranslateY = (y: number) => {
    y = Math.min(y, 0)
    y = Math.max(y, -(items.length - 1) * itemHeight)
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
        let y = translateY - remainder
        if (Math.abs(remainder) > 18) {
          y += itemHeight * (remainder > 0 ? 1 : -1)
        }
        setTranslateY(y)
        setIsTouching(false)
        onChange(items[Math.abs(y / itemHeight)])
      }}
    >
      <div border-b-1px border-t-1px b="orange" absolute w-full top="50%" style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2})` }} />
      <div border-b-1px border-t-1px b="orange" absolute w-full top="50%" style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2})` }} >
        <ol flex flex-col text-center children-flex children-items-center children-justify-center
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {items.map(item => <li style={{ height: itemHeight }} key={item}>{item}</li>) }
        </ol>
    </div>
  </div>
  )
}
