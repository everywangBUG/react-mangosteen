import { Link } from 'react-router-dom'
import { Icon } from '../../components/Icon'

// 使用IItems['kind]这种形式的引用值，可以在global.ts中改动了类型的时候能及时通知此处
interface Props {
  kind: IItems['kind']
  value?: IItems['tag_ids']
  onChange?: (ids: IItems['tag_ids']) => void
}

export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  const tags = Array.from({ length: 99 }).map((tag, index) => ({
    sign: '😁',
    name: `打车${index}`,
    id: index
  }))

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
        {tags.map((tag, index) => (
          <li key={index} w-48px flex flex-col justify-center items-center gap-y-8px onClick={() => { props.onChange?.([tag.id]) }}>
            {
              props.value?.includes(tag.id)
                ? <span flex justify-center items-center w-48px h-48px block bg="#EFEFEFEF" rounded='50%' text-24px b-1 b="#8F4CD7">{tag.sign}</span>
                : <span flex justify-center items-center w-48px h-48px block bg="#EFEFEFEF" rounded='50%' text-24px b-1 b-transparent>{tag.sign}</span>
            }
                <span text-12px>{tag.name}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
