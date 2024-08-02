import { GradientTimeSelect } from "../components/Gradient"
import { time, Time } from "../library/Time"
import s from "./TopTimeSelectBar.module.scss" 

interface Props {
  onSelect: (t: any) => void
  selected: TimeRange
}

export type TimeRange = 
{
  start: Time
  end: Time
  name: 
    | "thisMonth"
    | "lastMonth"
    | "thisYear"
    | "custom"
}

const defaultTimeRange: { key: TimeRange, value: string }[] = [
  {key: { name: "thisMonth", start: time().firstDayOfMonth, end: time().lastDayOfMonth }, value: "本月" },
  {key: { name: "lastMonth", start: time().add(-1, "month").firstDayOfMonth, end: time().add(-1, "month").lastDayOfMonth.add(1, "day") }, value: "上月" },
  {key: { name: "thisYear", start: time().set({ month: 1 }).firstDayOfMonth, end: time().set({ month: 12 }).lastDayOfMonth.add(1, "day") }, value: "今年" },
  {key: { name: "custom", start: time(), end: time() }, value: "自定义时间" },
]

export const TopTimeSelectBar: React.FC<Props> = (props) => {
  const { onSelect, selected } = props
  
  return (
    <GradientTimeSelect>
    <ol flex children-py-8px children-px-16px text-white>
      {
        defaultTimeRange.map(item => {
          return(<li key={item.value} className={item.key.name === selected.name ? s.active : " "} onClick={() => { onSelect(item.key)}}>{item.value}</li>)
        })
      }
    </ol>
  </GradientTimeSelect>
  )
}
