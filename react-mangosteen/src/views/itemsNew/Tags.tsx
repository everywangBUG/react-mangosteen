interface Props {
  kind: ItemNewKind
}

export const Tags: React.FC<Props> = ({ kind }) => {
  return (
    <>
      { kind === "expenses" ? "expenses" : "income" }
    </>
  )
}
