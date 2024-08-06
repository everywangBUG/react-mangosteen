import { GradientTopNav } from "../components/Gradient"
import { BackIcon } from "../components/BackIcon"
import { TopNav } from "../components/TopNav"
import { Tabs } from "../components/Tabs"
import { useState } from "react"
import s from "./ItemsNew.module.scss"

type TabNewItem = { key: string, value: string, element: React.ReactNode }
export const ItemsNew: React.FC = () => {
  const [value, setValue] = useState("expenses")
  const tabItems: TabNewItem[] = [
    { key: "income", value: "收入", element: <div>收入</div> },
    { key: "expenses", value: "支出", element: <div>支出</div> }
  ]

  return (
    <form className={s.wrapper}>
      <GradientTopNav>
        <TopNav title="记一笔" icon={<BackIcon name="back" className="w-24px h-24px" />}/>
      </GradientTopNav>
      <Tabs
        value={value}
        onChange={(item) => { setValue(item)} }
        tabItems={tabItems}
        className={"flex justify-evenly"}
        classPrefix="tabs"
      />
    </form>
  )
}
