import { Link, useNavigate } from "react-router-dom"
import { Icon } from "../../components/Icon"
import { useEffect, useState } from "react"
import { getTags } from "../../service/views/items/Items"
import { LongPressDiv } from "../../components/LongPressDiv"

interface Props {
  kind: Item["kind"]
  onChange?: (ids: Item["tag_ids"]) => void
  value?: Item["tag_ids"]
}

export const ItemsNewTags: React.FC<Props> = ({ kind, onChange, value }) => {
  const [page, setPage] = useState(1)
  const [resources, setResources] = useState<Resources>()
  const [tags, setTags] = useState<Tags[]>([])
  const navigator = useNavigate()
  const tagsRes = async () => await getTags({ kind, page})

  useEffect(() => {
    setPage(1)
    tagsRes().then(res => {
      setResources(res)
      if (res.resources) {
        setTags(res.resources as [])
      }
    })
  }, [kind])

  useEffect(() => {
    tagsRes().then(res => {
      setResources(res)
      if (res.resources) {
        setTags(prevTags => [...prevTags, ...res.resources as []])
      }
    })
  }, [page])
  const isLoadMore = () => {
    if (resources?.pager) {
      const currentPage = resources.pager.page
      const perPage = resources.pager.per_page
      const count = resources.pager.count
      return currentPage < Math.ceil(count / perPage)
    }
    return false
  }

  const isLoading = () => {
    return resources?.resources === undefined && resources === undefined
  }

  const loadRemainingData = async () => {
    if (isLoadMore()) {
      const totalPages = Math.ceil(resources!.pager.count / resources!.pager.per_page);
      for (let i = page + 1; i <= totalPages; i++) {
        setPage(i);
        await tagsRes()
      }
    }
  }

  return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px gap-y-16px pt-16px pb-32px px-4px>
        <li>
          <Link to={`/tags/new?kind=${kind}`}>
            <span flex justify-center items-center w-48px h-48px block bg="#EFEFEFEF" rounded="50%" text-orange>
              <Icon name="add" className={"w-24px h24px"}/>
            </span>
          </Link>
        </li>
        {
          tags.map((tag, index) => (
            <li key={index} onClick={() => onChange?.([tag.id])}>
              <LongPressDiv className={"flex flex-col justify-center items-center"} onEnd={() => navigator(`/tags/${tag.id}`)}>
                {
                  value?.includes(tag.id)
                    ?
                    <span w-48px h-48px flex justify-center items-center block bg="#EFEFEFEF" b-orange b-1 b-solid rounded="50%">{tag.sign}</span>
                    :
                    <span w-48px h-48px flex justify-center items-center block bg="#EFEFEFEF" b-transparent b-1 b-solid rounded="50%">{tag.sign}</span>
                }
                <span text-12px>{tag.name}</span>
              </LongPressDiv>
            </li>
          ))
        }
      </ol>
      {
        !isLoadMore()
          ?
          (isLoading()
            ?
            <div p-16px text-center>
              <span py-13px text="#999999">加载中...</span>
            </div>
            :
            <div py-8px text-center text="#999999">没有更多了</div>
          )
          :
          <div p-16px text-center>
            <button w-btn py-13px onClick={loadRemainingData} type="button">加载更多</button>
          </div>
      }
    </div>
  )
}
