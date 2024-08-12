import { GradientTopNav } from "../components/Gradient"
import { BackIcon } from "../components/BackIcon"
import { TopNav } from "../components/TopNav"
import { Tabs } from "../components/Tabs"
import { useState } from "react"
import s from "./ItemsNew.module.scss"
import { Tags } from "./itemsNew/Tags"

type TabNewItem = { key: string, value: string, element: React.ReactNode }
export const ItemsNew: React.FC = () => {
  const [value, setValue] = useState("income")
  const tabItems: TabNewItem[] = [
    { key: "income", value: "收入", element: <Tags kind="income" /> },
    { key: "expenses", value: "支出", element: <Tags kind="expenses" /> }
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
