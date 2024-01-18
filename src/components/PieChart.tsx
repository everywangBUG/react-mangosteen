import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type Props = {
  items?: { x: number | string; y: number }[]
  className?: string
}

export const PieChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const div = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!div.current) { return }
    const myChart = echarts.init(div.current)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      series: [
        {
          type: 'pie',
          radius: [20, 100],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: items?.map(item => ({ value: item.y, name: item.x }))
        }
      ]
    }
    myChart.setOption(option)
  }, [])
  return (
    <div className={className} ref={div}>PieChart</div>
  )
}
