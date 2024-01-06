import { useState } from 'react'
import { time } from '../lib/time'

type Props = {
  start?: Date
  end?: Date
  value?: Date
}

export const DatePicker: React.FC<Props> = (props) => {
  const { start, end, value } = props
  console.log('-10年', time().add(-10, 'years').format('yyyy年MM月dd日 HH:mm:ss.fff'))
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateY] = useState(0)

  return (
    <div
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
      const remainder = translateY % 36
      if (Math.abs(remainder) < 18) {
        setTranslateY(translateY - remainder)
      }
      else {
        setTranslateY(translateY - remainder + 36 * Math.sign(remainder))
      }
      setIsTouching(false)
    }}
  >
    <div b-1 b-red h-36px absolute top="[calc(50%-18px)]" w-full />
    <div b-1 b-red h-36px absolute top="[calc(50%-18px)]" w-full>
      <ol flex flex-col children-h-36px text-center children-leading-36px
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <li>2013</li>
        <li>2014</li>
        <li>2015</li>
        <li>2016</li>
        <li>2017</li>
        <li>2018</li>
        <li>2019</li>
        <li>2020</li>
        <li>2021</li>
        <li>2013</li>
        <li>2014</li>
        <li>2015</li>
        <li>2016</li>
        <li>2017</li>
        <li>2018</li>
        <li>2019</li>
        <li>2020</li>
        <li>2021</li>
        <li>2013</li>
        <li>2014</li>
        <li>2015</li>
        <li>2016</li>
        <li>2017</li>
        <li>2018</li>
        <li>2019</li>
        <li>2020</li>
        <li>2021</li>
        <li>2013</li>
        <li>2014</li>
        <li>2015</li>
        <li>2016</li>
        <li>2017</li>
        <li>2018</li>
        <li>2019</li>
        <li>2020</li>
        <li>2021</li>
      </ol>
    </div>
  </div>
  )
}
