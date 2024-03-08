import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type Props = {
  items?: { name: number | string; value: number }[]
  className?: string
}

export const PieChart: React.FC<Props> = (props) => {
  const { className, items } = props
  const div = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const myChart = useRef<echarts.ECharts>()
  useEffect(() => {
    if (!div.current) { return }
    if (initialized.current) { return }
    myChart.current = echarts.init(div.current)
    initialized.current = true

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: ({ data: { name, value } }) => {
          return `${name} ${value}元`
        }
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
          data: items
        }
      ]
    }
    myChart.current.setOption(option)
  }, [])
  useEffect(() => {
    const option = {
      series: [
        {
          data: items
        }
      ]
    }
    if (myChart.current) {
      myChart.current.setOption(option)
    }
  }, [items])
  return (
    <div className={className} ref={div}>PieChart</div>
  )
}
