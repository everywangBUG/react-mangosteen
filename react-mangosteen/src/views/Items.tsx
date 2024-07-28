import { useState } from "react"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"
import { GradientTopNav } from "../components/Gradient"
import { TopTimeSelectBar } from "../components/TopTimeSelectBar"

type TimeRange = "thisMonth" | "lastMonth" | "thisYear" | "custom"

export const Items: React.FC = () => {
  const [outOfTime, setOutOfTime] = useState(false)
  const [timeRange, _setTimeRange] = useState<TimeRange>("thisMonth")
  
  const setTimeRange = (t: TimeRange) => {
    _setTimeRange(t)
  }
  
  return (
    <div>
      <GradientTopNav>
        <TopNav icon={<Icon name="menu" className="w-24px h-24px" />} title="橙子记账" />
      </GradientTopNav>
      <TopTimeSelectBar onSelect={setTimeRange} selected={timeRange} />
    </div>) 
}
