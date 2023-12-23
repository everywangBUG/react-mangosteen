import useSWRInfinite from 'swr/infinite'
import type { IItems, IResources } from '../../global.d.ts'
import { ajax } from '../../lib/ajax'

const getKey = (pageIndex: number, pre: IResources<IItems>) => {
  // 发送请求的所有count
  if (pre) {
    const sendCount = (pre.pager.page - 1) * pre.pager.per_page + pre.resources.length
    const count = pre.pager.count
    if (sendCount >= count) {
      return null
    }
  }
  return `/api/v1/items/?page=${pageIndex + 1}`
}

export const CountDetailList: React.FC = () => {
  const { data, size, setSize } = useSWRInfinite(
    getKey, async (path) => (await ajax.get<IResources<IItems>>(path)).data
  )

  // 加载更多的时候页码加一
  const onLoadMore = () => {
    setSize(size + 1)
  }

  if (!data) {
    return <span>网络请求未到达</span>
  }
  else {
    return <>
      <ol>{
        data.map(({ resources }) => {
          return resources.map(item =>
            <li key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-8px border-b-1 b="#EEE">
              <div row-start-1 col-start-1 row-end-3 col-end-2 w-48px h-48px text-24px bg="#D8D8D8" rounded="50%"
                flex justify-center items-center
              >
                💖
              </div>
              <div row-start-1 col-start-2 row-end-2 col-end-3 flex items-center>旅行</div>
              <div row-start-2 col-start-2 row-end-3 col-end-3 text="#999999" flex items-center>{item.created_at}</div>
              <div row-start-1 col-start-3 row-end-3 col-end-4 flex items-center text="#53A867">
                { `￥${item.amount}` }
              </div>
            </li>
          )
        })
      }</ol>
      <div flex justify-center items-center p-16px>
        <button w-btn onClick={onLoadMore}>加载更多</button>
      </div>
    </>
  }
  // return (
  //   <div>
  //     <ol>
  //     </ol>
  //     <div flex justify-center items-center p-16px>
  //       <button w-btn>加载更多</button>
  //     </div>
  //     <AddButton />
  //   </div>
  // )
}
