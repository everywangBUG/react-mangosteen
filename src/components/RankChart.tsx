type Props = {
  className?: string
  items?: { name: string; value: number; icon: string }[]
}

const colors = ['#61cdbb', '#ef8e24', '#a2dcf3', '#d73027', '#f6eff7', '#fee0d2', '#f46d43', '#a50026', '#7f000d', '#400004']

export const RankChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const total = items?.reduce((acc, it) => acc + it.value, 0) ?? 0
  const max = items?.reduce((prev, it) => Math.max(prev, it.value), 0) ?? 0
  return (
    <div className={className}>
      {
        items
          ? items?.map((it, index) => (
            <div key={index} grid grid-cols="[48px_1fr_1fr]" grid-rows="[repeat(2,1fr)]" p-16px gap-x-8px gap-y-6px items-center>
              <div row-start-1 col-start-1 row-end-3 col-end-2 h-48px w-48px rounded-24px
                flex justify-center items-center text-24px bg="#EFEFEF">{it.icon}</div>
              <div row-start-1 col-start-2 row-end-2 col-end-3 self-end>{it.name} - {(it.value / total * 100).toFixed(0)}%</div>
              <div row-start-1 col-start-3 row-end-2 col-end-4 text-right self-end>￥{it.value}元</div>
              <div row-start-2 col-start-2 row-end-3 col-end-4 self-start h-8px rounded-4px bg="#EFEFEF">
                <div style={{ background: colors[index], width: `${it.value / max * 100}%` }} h-8px rounded-4px />
              </div>
            </div>
          ))
          : '暂无数据'
      }
    </div>
  )
}
