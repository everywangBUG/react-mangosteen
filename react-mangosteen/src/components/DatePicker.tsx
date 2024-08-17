import { useState } from "react"

export const DatePicker: React.FC = () => {
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateY] = useState(0)
  return (
    <div w-full
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
            // currentY % 36 < 18
            //   ? setTranslateY(currentY - currentY % 36)
            //   : setTranslateY(currentY + (36 - currentY % 36))
            setTranslateY(translateY + currentY)
            setLastY(y)
          }
        }
      }
      onTouchEnd={
        () => {
          const yuShu = translateY % 36
          if (yuShu > 0) {
            if (yuShu < 18) {
              setTranslateY(translateY - yuShu)
            } else {
              setTranslateY(translateY + (36 - yuShu))
            }
          } else {
            if (yuShu < -18) {
              setTranslateY(translateY - (36 + yuShu))
            } else {
              setTranslateY(translateY - yuShu)
            }
          }
          setIsTouching(false)
        }
      }
    >
      <div w-full b-1px b-red b-solid h="36px" absolute top="[calc(50%-18px)]"></div>
      <div w-full bg-white text-center>
        <ol h-50vh children-h-36px children-leading-36px style={{transform: `translateY(${translateY}px)`}}>
          <li>2000</li>
          <li>2001</li>
          <li>2002</li>
          <li>2003</li>
          <li>2004</li>
          <li>2005</li>
          <li>2006</li>
          <li>2007</li>
          <li>2008</li>
          <li>2009</li>
          <li>2010</li>
          <li>2011</li>
          <li>2012</li>
          <li>2013</li>
          <li>2014</li>
          <li>2015</li>
          <li>2016</li>
          <li>2017</li>
          <li>2018</li>
          <li>2019</li>
          <li>2020</li>
          <li>2021</li>
          <li>2022</li>
          <li>2023</li>
          <li>2024</li>
          <li>2025</li>
          <li>2026</li>
        </ol>
      </div>
    </div>
  )
}
