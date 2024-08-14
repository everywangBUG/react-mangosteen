import { GradientTopNav } from "../components/Gradient"
import { BackIcon } from "../components/BackIcon"
import { TopNav } from "../components/TopNav"
import { Tabs } from "../components/Tabs"
import s from "./ItemsNew.module.scss"
import { Tags } from "./itemsNew/Tags"
import { TagsAmount } from "./itemsNew/TagsAmount"
import { TagsDate } from "./itemsNew/TagsDate"
import { useCreateItem } from "../store/useCreateItem"

type TabNewItem = { key: string, value: string, element: React.ReactNode }
export const ItemsNew: React.FC = () => {
  const { data, error, setData, setError} = useCreateItem()
  const tabItems: TabNewItem[] = [
    { key: "income", value: "收入", element: <Tags kind="income" /> },
    { key: "expenses", value: "支出", element: <Tags kind="expenses" /> }
  ]

  return (
    <form className={s.wrapper} flex flex-col h-screen>
      <GradientTopNav>
        <TopNav title="记一笔" icon={<BackIcon name="back" className="w-24px h-24px" />}/>
      </GradientTopNav>
      <Tabs
        selected={data.kind}
        onChange={(kind) => { setData({ kind })}}
        tabItems={tabItems}
        className={"flex justify-evenly"}
        classPrefix="tabs"
      />
      <TagsDate />
      <TagsAmount className={"grow-0 shrink-0"} />
    </form>
  )
}
