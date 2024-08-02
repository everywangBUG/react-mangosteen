import { useState, useEffect } from "react"
import { Time } from "../../library/Time"
import { getItems } from "../../service/views/items/Items"

interface Props {
  start: Time
  end: Time
}

export const ItemsList: React.FC<Props> = (props) => {
  const { start, end } = props
  const [resources, setResources] = useState<Resources>()
  const itemsRes = async () => await getItems({
    page: 1,
    happen_after: start.removeTime.toISOString,
    happen_before: end.removeTime.toISOString,
  })

  useEffect(() => {
    itemsRes().then(res => setResources(res))
  }, [start, end])

  return (
    <>
      <ol >
        {resources?.resources?.map((item: Item) => {
          return (
              <li key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-12px border-b-1>
              <div row-start-1 col-start-1 row-end-3 col-end-2 text-24px w-48px h-48px
                bg="#D8D8D8" rounded="50%" flex justify-center items-center>
                {item.tags && item.tags[0].sign}
              </div>
              <div row-start-1 col-start-2 row-end-2 col-end-3>
                {item.tags && item.tags[0].name}
              </div>
              <div row-start-2 col-start-2 row-end-3 col-end-4 text="#999999">
                {item.happen_at}
              </div>
              <div row-start-1 col-start-3 row-end-2 col-end-4 text="#53A867">
                {item.amount}
              </div>
            </li>)
          }
        )}
      </ol>
      <div p-16px text-center>
        <button w-btn py-13px>加载更多</button>
      </div>
    </>)
}
