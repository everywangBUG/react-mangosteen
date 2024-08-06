import { useState } from "react"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"
import { GradientTopNav } from "../components/Gradient"
import { TimeRange, TopTimeSelectBar } from "../components/TopTimeSelectBar"
import { ItemSummary } from "./items/itemsSummary"
import { ItemsList } from "./items/ItemsList"
import { AddButton } from "../components/AddButton"
import { TopMenu } from "../components/TopMenu"
import { time, Time } from "../library/Time"
import { useVisible } from "../store/useVisible"

export const Items: React.FC = () => {
  const [outOfTime, setOutOfTime] = useState(false)
  const {visible, setVisible} = useVisible()
  const [timeRange, _setTimeRange] = useState<TimeRange>({
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth,
    name: "thisMonth",
  })

  const { start, end } = timeRange

  const setTimeRange = (t: TimeRange) => {
    if (t.start.timestamp > t.end.timestamp) {
      [t.start, t.end] = [t.end, t.start]
    }
    if (t.end.timestamp - t.start.timestamp > Time.DAY * 730) {
      setOutOfTime(true)
    }
    _setTimeRange(t)
  }

  return (
    <div relative>
      <GradientTopNav>
        <TopNav icon={<Icon name="menu" className="w-24px h-24px" onClick={() => {setVisible()}} />} title="橙子记账" />
      </GradientTopNav>
      <TopTimeSelectBar onSelected={setTimeRange} selected={timeRange} />
      {
        outOfTime
          ? <div className="text-center text-18px text-red-500">时间范围不能超过两年</div>
          : <>
            <ItemSummary />
            <ItemsList start={start} end={end} />
          </>
      }
      <AddButton />
      <TopMenu visible={visible} onClose={() => {setVisible()}}/>
    </div>) 
}
