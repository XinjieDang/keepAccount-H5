import * as echarts from 'echarts/core'
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  LineChart,
} from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useEffect, useRef } from 'react'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LineChart,
])

const ECharts: React.FC = () => {
  // 1. get DOM
  const chartRef = useRef(null)

  useEffect(() => {
    // 2. 实例化表格对象
    const chart = echarts.init(
      chartRef.current as unknown as HTMLDivElement,
      undefined,
      {
        width: 300,
        height: 500,
      }
    )
    // 3. 定义数据
    const option = {
      title: {
        text: '测试图表',
      },
      xAxis: {
        type: 'category',
        data: ['1-1', '1-2', '1-3', '1-5', '1-6', '1-7', '1-8', '1-9'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [140, 110, 100, 90, 70, 30, 10, 0],
          type: 'line',
        },
      ],
    }
    // 4. 调用表格数据
    chart.setOption(option)
    //监听窗口变化
    window.onresize = () => {
      //自动改变图表大小，图表宽度和高度必须设置百分比或者vh
      chart.resize()
    }
  }, [])

  return <div className="charts" ref={chartRef} />
}

export default ECharts
