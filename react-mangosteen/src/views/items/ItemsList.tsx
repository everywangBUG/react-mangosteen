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
  const [items, setItems] = useState<Item[]>([])
  const [page, setPage] = useState(1)
  const itemsRes = async () => await getItems({
    page,
    happen_after: start.removeTime.toISOString,
    happen_before: end.removeTime.toISOString,
  })

  useEffect(() => {
    itemsRes().then(res => {
      setResources(res)
      if (res.resources) {
        setItems(prevItems => [...prevItems, ...res.resources])
      }})
  }, [start, end, page])

  const isLoadMore = () => {
    if (resources?.pager) {
      const currentPage = resources.pager.page
      const perPage = resources.pager.per_page
      const count = resources.pager.count
      return currentPage < Math.ceil(count / perPage)
    }
    return false
  }

  const loadRemainingData = async () => {
    if (isLoadMore()) {
      const totalPages = Math.ceil(resources!.pager.count / resources!.pager.per_page);
      for (let i = page + 1; i <= totalPages; i++) {
        setPage(i);
        await itemsRes()
      }
    }
  }

  return (
    <>
      <ol >
        {items.map((item: Item) => {
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
      {
        isLoadMore()
          ?
          <div p-16px text-center>
            <button w-btn py-13px onClick={loadRemainingData}>加载更多</button>
          </div>
          :
          <div py-8px text-center text="#999999" text-12px>没有更多了</div>
      }
    </>)
}
