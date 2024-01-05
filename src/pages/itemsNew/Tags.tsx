import { Icon } from '../../components/Icon'

interface Props {
  kind: ExpendIncome
}

export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  const tags = Array.from({ length: 19 })

  return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px gap-y-16px py-16px px-4px>
        <span flex justify-center items-center w-48px h-48px block bg="#EFEFEFEF" rounded='50%' text="#8F4CD7"><Icon name="add" className="h-24px w-24px" /></span>
        {tags.map((tag, index) => (
          <li key={index} w-48px flex flex-col justify-center items-center gap-y-8px>
            <span flex justify-center items-center w-48px h-48px block bg="#EFEFEFEF" rounded='50%' text-24px b-1 b="#8F4CD7">🤡</span>
            <span text-12px>打车</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
