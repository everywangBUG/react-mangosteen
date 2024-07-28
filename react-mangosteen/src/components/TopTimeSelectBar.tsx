import { GradientTimeSelect } from "../components/Gradient"
import s from "./TopTimeSelectBar.module.scss" 
import type { TimeRange } from "../views/Items"

interface Props {
  onSelect: (t: any) => void
  selected: TimeRange
}

export type TimeRangeArr = Array<{key: { name: string, start: string, end: string }, value: string}>

const defaultTimeRange: TimeRangeArr = [
  {key: { name: "thisMonth", start: "2023-10-01", end: "2023-10-31" }, value: "本月" },
  {key: { name: "lastMonth", start: "2023-09-01", end: "2023-09-30" }, value: "上月" },
  {key: { name: "thisYear", start: "2023-01-01", end: "2023-12-31" }, value: "今年" },
  {key: { name: "custom", start: "", end: "" }, value: "自定义时间" },
]

export const TopTimeSelectBar: React.FC<Props> = (props) => {
  const { onSelect, selected } = props
  
  return (
    <GradientTimeSelect>
    <ol flex children-py-8px children-px-16px text-white>
      {
        defaultTimeRange.map(item => {
          return(<li key={item.value} className={item.key.name === selected ? s.active : " "} onClick={() => onSelect(item.key.name)}>{item.value}</li>)
        })
      }
    </ol>
  </GradientTimeSelect>
  )
}
