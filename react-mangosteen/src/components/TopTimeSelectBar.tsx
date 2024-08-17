import { useState } from "react"
import { GradientTimeSelect } from "../components/Gradient"
import { time, Time } from "../library/Time"
import { usePopup } from "../hooks/usePopup"
import { Input } from "./Input"
import { Tabs } from "./Tabs"

interface Props {
  onSelected: (t: any) => void
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
  const { onSelected: _onSelected, selected } = props
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")
  const onConfirm = () => {
    closePopup()
  }

  const { popup, openPopup, closePopup } = usePopup({
    zIndex: "var(--z-dialog)",
    position: "center",
    children:
    <div w-320px h-350px rounded-16px bg-white>
      <header bg-orange py-4 shrink-0 w="100%" rounded-t-16px>
        <span ml-8px>请选择时间</span>
      </header>
      <main shrink-1 grow-1 p-16px>
        <Input type="data" label="开始时间" onChange={setStart} value={start} />
        <Input type="data" label="结束时间" onChange={setEnd} value={end} />
      </main>
      <footer w="100%" py-4 text-right>
        <button bg-transparent px-8px onClick={() => { closePopup() }}>取消</button>
        <button bg-transparent px-8px onClick={onConfirm}>确定</button>
      </footer>
    </div>
  })


  const onSelected = (t: TimeRange) => {
    if (t.name === "custom") {
      openPopup()
    } else {
      _onSelected(t)
    }
  }
  
  return (
    <>
      <GradientTimeSelect>
        <Tabs tabItems={defaultTimeRange} selected={selected} onChange={onSelected} />
      </GradientTimeSelect>
      {popup}
    </>
  )
}
