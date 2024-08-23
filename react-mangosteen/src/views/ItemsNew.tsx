import { GradientTopNav } from "../components/Gradient"
import { BackIcon } from "../components/BackIcon"
import { TopNav } from "../components/TopNav"
import { Tabs } from "../components/Tabs"
import s from "./ItemsNew.module.scss"
import { Tags } from "./itemsNew/Tags"
import { ItemsNewAmount } from "./itemsNew/ItemsNewAmount"
import { useCreateItem } from "../store/useCreateItem"
import { ItemsNewDate } from "./itemsNew/ItemsNewDate"
import { hasError, validate } from "../library/validate"
import { postItems } from "../service/views/items/Items"
import { time } from "../library/Time"
import { useNavigate } from "react-router-dom"
import { FormEvent } from "react"

type TabNewItem = { key: string, value: string, element: React.ReactNode }
export const ItemsNew: React.FC = () => {
  const { data, setData, setError} = useCreateItem()
  const navigator = useNavigate()
  const tabItems: TabNewItem[] = [
    { key: "income", value: "收入", element: <Tags kind="income" onChange={(tag_ids) => {setData({tag_ids})}} value={data.tag_ids} />},
    { key: "expenses", value: "支出", element: <Tags kind="expenses" onChange={(tag_ids) => {setData({tag_ids})}} value={data.tag_ids} /> }
  ]

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors = validate(data, [
      { key: "amount", type: "required", message: "请输入金额" },
      { key: "happen_at", type: "required", message: "请选择日期" },
      { key: "tag_ids", type: "required", message: "请选择标签" }
    ])
    setError(errors)
    if (hasError(errors)) {
      const errorMessage = Object.values(errors).flat().join("\n")
      alert(errorMessage)
    } else {
      await postItems(data)
      setData({amount: 0, happen_at: time().toISOString})
      navigator("/items")
    }
  }

  return (
    <form className={s.wrapper} flex flex-col h-screen onSubmit={onSubmit}>
      <GradientTopNav>
        <TopNav title="记一笔" icon={<BackIcon name="back" className="w-24px h-24px" />}/>
      </GradientTopNav>
      <Tabs
        selected={data.kind}
        onChange={(kind) => setData({ kind })}
        tabItems={tabItems}
        className={"flex justify-evenly"}
        classPrefix="tabs"
      />
      <ItemsNewAmount className={"grow-0 shrink-0"} value={data.amount} onChange={(amount) => {setData({amount})}} onSubmit={onSubmit}
        tagsDate={<ItemsNewDate value={data.happen_at} onChange={(happen_at) => {setData({happen_at})}} />}/>
    </form>
  )
}
