import { Link } from 'react-router-dom'
import useSWRInfinite from 'swr/infinite'
import { Icon } from '../../components/Icon'
import { useAjax } from '../../lib/ajax'

// 使用IItems['kind]这种形式的引用值，可以在global.ts中改动了类型的时候能及时通知此处
interface Props {
  kind: Tag['kind']
  value?: Tag['tag_ids']
  onChange?: (ids: Tag['tag_ids']) => void
}

const getKey = (pageIndex: number, pre: IResources<Tag>) => {
  // 发送请求的所有count
  if (pre) {
    const sendCount = (pre.pager.page - 1) * pre.pager.per_page + pre.resources.length
    const count = pre.pager.count
    if (sendCount >= count) {
      return null
    }
  }
  return `/api/v1/tags?page=${pageIndex + 1}`
}

export const Tags: React.FC<Props> = (props) => {
  const { kind } = props

  const { get } = useAjax({ showLoading: true, handleError: true })
  const { data, error, size, setSize } = useSWRInfinite(
    getKey, async (path) => (await get<IResources<Tag>>(path)).data, { revalidateFirstPage: false }
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
    return <div>空</div>
  } else {
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    const hasMore = (page - 1) * per_page + last.resources.length < count

    return (
      <div>
        <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px gap-y-16px pt-16px pb-32px px-4px>
          <li>
            <Link to={`/tags/new?kind=${kind}`}>
              <span flex justify-center items-center w-48px h-48px block bg="#EFEFEFEF" rounded='50%' text="#8F4CD7">
                <Icon name="add" className="h-24px w-24px" />
              </span>
            </Link>
          </li>
          {
            data.map(({ resources }) => {
              return resources.map((tag, index) =>
                <li key={index} w-48px flex flex-col justify-center items-center gap-y-8px onClick={() => { props.onChange?.([tag.id]) }}>
                  {
                    props.value?.includes(tag.id)
                      ? <span flex justify-center items-center w-48px h-48px block bg="#EFEFEFEF" rounded='50%' text-24px b-1 b="#8F4CD7">{tag.sign}</span>
                      : <span flex justify-center items-center w-48px h-48px block bg="#EFEFEFEF" rounded='50%' text-24px b-1 b-transparent>{tag.sign}</span>
                  }
                      <span text-12px>{tag.name}</span>
                </li>
              )
            })
          }
        </ol>
        {error && <span>网络请求错误，请刷新页面</span>}
        <div flex justify-center items-center p-16px>
          {
            !hasMore ? <div>没有更多了</div> : (isLoading ? <span>加载中...</span> : <button j-btn onClick={onLoadMore}>加载更多</button>)
          }
        </div>
      </div>
    )
  }
}
