import { useState } from "react"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"
import { GradientTopNav } from "../components/Gradient"
import { TopTimeSelectBar } from "../components/TopTimeSelectBar"
import { ItemSummary } from "./items/itemsSummary"
import { ItemsList } from "./items/ItemsList"
import { AddButton } from "../components/AddButton"
import { TopMenu } from "../components/TopMenu"

type TimeRange = "thisMonth" | "lastMonth" | "thisYear" | "custom"

export const Items: React.FC = () => {
  const [outOfTime, setOutOfTime] = useState(false)
  const [visible, setVisible] = useState(false)
  const [timeRange, _setTimeRange] = useState<TimeRange>("thisMonth")
  const [items] = useState([
    {
      "id": 756,
      "user_id": 285,
      "name": "Lab.",
      "sign": "😡",
      "deleted_at": null,
      "created_at": "2023-09-13T16:50:04.675+08:00",
      "updated_at": "2023-09-13T16:50:04.675+08:00",
      "kind": "expenses"
    },
    {
      "id": 755,
      "user_id": 285,
      "name": "Bla.",
      "sign": "😡",
      "deleted_at": null,
      "created_at": "2023-09-13T16:50:04.672+08:00",
      "updated_at": "2023-09-13T16:50:04.672+08:00",
      "kind": "expenses"
    },
  ])
  
  const setTimeRange = (t: TimeRange) => {
    _setTimeRange(t)
  }

  return (
    <div relative>
      <GradientTopNav>
        <TopNav icon={<Icon name="menu" className="w-24px h-24px" onClick={() => {setVisible(true)}} />} title="橙子记账" />
      </GradientTopNav>
      <TopTimeSelectBar onSelect={setTimeRange} selected={timeRange} />
      <ItemSummary />
      <ItemsList items={items}/>
      <AddButton />
      <TopMenu visible={visible} onClose={() => {setVisible(false)}}/>
    </div>) 
}
