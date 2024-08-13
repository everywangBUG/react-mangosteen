import { Link } from "react-router-dom"
import { Icon } from "../../components/Icon"
import { useEffect, useState } from "react"
import { getTags } from "../../service/views/items/Items"

interface Props {
  kind: ItemNewKind
}

export const Tags: React.FC<Props> = ({ kind }) => {
  const [page, setPage] = useState(1)
  const [resources, setResources] = useState<Resources>()
  const [tags, setTags] = useState<Tags[]>([])

  const tagsRes = async () => await getTags({ kind, page})

  useEffect(() => {
    tagsRes().then(res => {
      setResources(res)
      if (res.resources) {
        setTags(prevTags => [...prevTags, ...res.resources])
      }
    })
  }, [page, kind])

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
          tags.map(tag => (
            <li key={tag.id}>
              <span w-48px flex flex-col justify-center items-center gap-y-8px h="100%">
                {tag.sign}
              </span>
            </li>
          ))
        }
      </ol>
    </div>
  )
}
