import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type Props = {
  items?: { x: number | string; y: number }[]
  className?: string
}

export const LineChart: React.FC<Props> = (props) => {
  const { className, items = [] } = props
  const div = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  const xItems = items.map((item) => item.x)
  const yItems = items.map((item) => item.y)
  useEffect(() => {
    if (!div.current) { return }
    if (initialized.current) { return }
    const myChart = echarts.init(div.current)
    initialized.current = true

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: ([{ axisValue, data }]: any) => {
          const parts = axisValue.split('-')
          const label = `${parts[0]}年${parts[1]}月${parts[2]}日`
          const value = data === null ? '无数据' : `${data} 元`
          return `${label}<br/><div style="text-align: right;">${value}</div>`
        }
      },
      grid: {
        left: 16,
        right: 16,
        top: 8,
        bottom: 20
      },
      xAxis: {
        type: 'category',
        data: xItems,
        axisLabel: {
          formatter: (value: string) => {
            return value.slice(value.indexOf('-') + 1)
          }
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false
        }
      },
      series: [
        {
          data: yItems,
          type: 'line',
        }
      ]
    }
    myChart.setOption(option)
  }, [])

  return (
    <div ref={div} className={className}></div>
  )
}
