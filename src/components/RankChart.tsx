type Props = {
  className?: string
  items?: { name: string; value: number; icon: string }[]
}

export const RankChart: React.FC<Props> = (props) => {
  const { className, items } = props
  return (
    <div className={className}>
      {
        items
          ? items?.map((it, index) => (
            <div key={index} grid grid-cols="[48px_1fr_1fr]" grid-rows="[repeat(2,1fr)]" p-16px gap-x-8px gap-y-6px items-center>
              <div row-start-1 col-start-1 row-end-3 col-end-2 h-48px w-48px rounded-24px flex justify-center items-center text-24px bg="#EFEFEF">{it.icon}</div>
              <div row-start-1 col-start-2 row-end-2 col-end-3 self-end>{it.name}</div>
              <div row-start-1 col-start-3 row-end-2 col-end-4 text-right self-end>{it.value}</div>
              <div row-start-2 col-start-2 row-end-3 col-end-4 self-start bg-red h-8px></div>
            </div>
          ))
          : '暂无数据'
      }
    </div>
  )
}
