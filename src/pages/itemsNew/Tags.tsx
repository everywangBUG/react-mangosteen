interface Props {
  kind: ExpendIncome
}

export const Tags: React.FC<Props> = (props) => {
  const { kind } = props
  const tags = Array.from({ length: 100 })

  return (
    <div>
      <ol grid grid-cols="[repeat(auto-fit,48px)]" justify-center gap-x-32px gap-y-16px py-16px px-4px>
        {tags.map((tag, index) => (
          <li key={index} w-48px h48px b-1 b-red flex justify-center items-center rounded="50%">🤡</li>
        ))}
      </ol>
    </div>
  )
}
