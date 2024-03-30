import useSWRInfinite from 'swr/infinite'
import { useAjax } from '../../lib/ajax'
import type { Time } from '../../lib/time'
import { time } from '../../lib/time'

type Props = {
  start: Time
  end: Time
}

export const CountDetailList: React.FC<Props> = (props) => {
  const { start = time(), end = time() } = props
  const getKey = (pageIndex: number, pre: IResources<IItems>) => {
    // 发送请求的所有count
    if (pre) {
      const sendCount = (pre.pager.page - 1) * pre.pager.per_page + pre.resources.length
      const count = pre.pager.count
      if (sendCount >= count) {
        return null
      }
    }
    return `/api/v1/items?page=${pageIndex + 1}&`
     + `happen_after=${start.removeTime.toISOString}&`
     + `happen_before=${end.removeTime.toISOString}`
  }

  const { get } = useAjax()
  const { data, error, size, setSize } = useSWRInfinite(
    getKey, async (path) => (await get<IResources<IItems>>(path)).data, { revalidateAll: true }
  )

  // 加载更多的时候页码加一
  const onLoadMore = () => {
    setSize(size + 1)
  }

  // 加载第一页数据的加载中
  const isLoadingInitialData = !data && !error
  // 加载后面数据的加载中
  const isLoadingMore = data?.[size - 1] === undefined && !error
  // 综合判断是否是在加载中
  const isLoading = isLoadingMore || isLoadingInitialData

  if (!data) {
    // 第一页加载错误
    return <div px-16px text-center>
      {error && <span>网络请求错误，请刷新页面</span>}
      {isLoading && <span>加载中...</span>}
    </div>
  }
  else {
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    const hasMore = (page - 1) * per_page + last.resources.length < count

    return <>
      <ol>{
        data.map(({ resources }) => {
          return resources.map(item =>
            <li key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-8px border-b-1 b="#EEE">
              <div row-start-1 col-start-1 row-end-3 col-end-2 w-48px h-48px text-24px bg="#D8D8D8" rounded="50%"
                flex justify-center items-center
              >
                {item.tags && item.tags[0].sign}
              </div>
              <div row-start-1 col-start-2 row-end-2 col-end-3 flex items-center>{item.tags && item.tags[0].name}</div>
              <div row-start-2 col-start-2 row-end-3 col-end-3 text="#999999" flex items-center>{time(item.created_at).format('yyyy-MM-dd HH:mm:  ss')}</div>
              <div row-start-1 col-start-3 row-end-3 col-end-4 flex items-center text="#53A867">
                {`￥${item.amount / 100}`}
              </div>
            </li>
          )
        })
      }</ol>
      {/* 后面的页面加载错误 */}
      {error && <span>网络请求错误，请刷新页面</span>}
      <div flex justify-center items-center p-16px>
        {
          !hasMore ? <div>没有更多了</div> : (isLoading ? <span>加载中...</span> : <button j-btn onClick={onLoadMore}>加载更多</button>)
        }
      </div>
    </>
  }
}
