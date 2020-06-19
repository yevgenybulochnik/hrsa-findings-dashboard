import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

/* eslint-disable import/no-duplicates */
import * as d3 from 'd3'
import { ScaleTime, ScaleLinear } from 'd3'
/* eslint-enable import/no-duplicates */

const Chart = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  svg {
    position: absolute;
    rect {
      fill: #48AFF0;
      stroke-width: 1;
      stroke: #0E5A8A;
      fill-opacity: 75%;
    }
  }
  .tooltip {
    position: absolute;
    padding: 5px;
    background-color: grey;
  }
`

type Margin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Props {
  height: string;
  data: any;
}

interface State {
  width: number;
  height: number;
  margin: Margin;
  chartWidth: number;
  chartHeight: number;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
}


class BarChart extends React.Component<Props, State> {
  timerID: number | undefined = undefined

  container: React.RefObject<HTMLDivElement> = React.createRef()

  state: State = {
    width: 0,
    height: 0,
    margin: {
      top: 20,
      right: 20,
      bottom: 35,
      left: 30,
    },
    chartWidth: 0,
    chartHeight: 0,
    xScale: d3.scaleTime(),
    yScale: d3.scaleLinear(),
  }

  componentDidMount(): void {
    this.setDimensions()

    window.addEventListener('resize', this.onResize)
  }

  componentDidUpdate(prevProps: Props): void {
    if (this.props.data !== prevProps.data) {
      this.reDrawChart()
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = (): void => {
    clearTimeout(this.timerID)
    this.timerID = setTimeout(() => {
      this.reDrawChart()
    }, 200) as any // eslint-disable-line
  }

  getWidth(): number {
    const container = this.container.current

    if (container) {
      return container.offsetWidth
    }
    return 0
  }

  getHeight(): number {
    const container = this.container.current
    if (container) {
      return container.offsetHeight
    }
    return 0
  }

  setDimensions(): void {
    const { margin, xScale, yScale } = this.state
    const { data } = this.props

    const width = this.getWidth()
    const height = this.getHeight()

    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    const xExtent = d3.extent(data, (d:any) => moment(`${d.year}-01-01`))

    this.setState({
      width,
      height,
      chartWidth,
      chartHeight,
      // @ts-ignore
      xScale: xScale.domain([xExtent[0]?.subtract(6, 'months'), xExtent[1]?.add(6, 'months')]).range([0, chartWidth]),
        // @ts-ignore
      yScale: yScale.domain([0, d3.max(data, (d: any) => d.count) + 50]).range([chartHeight, 0]),
    }, () => {
      this.drawChart()
    })
  }

  drawChart(): void {
    const {
      width, height, margin, chartWidth, chartHeight, xScale, yScale, // eslint-disable-line
    } = this.state

    const { data } = this.props

    /* eslint-disable indent */
    const chart = d3.select(this.container.current)
      .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('shape-rendering', 'crispEdges')
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // X-Axis
    chart.append('g')
      .attr('class', 'xScale')
      .call(
        d3.axisBottom(xScale)
          .tickFormat((t) => moment(t as Date).format('Y')),
      )
      .attr('transform', `translate(0, ${chartHeight})`)
      .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)')

    // Y-Axis
    chart.append('g')
      .attr('class', 'yAxis')
      .call(d3.axisLeft(yScale))

    // Y-grid
    chart.append('g')
      .attr('class', 'yGrid')
      .attr('opacity', '0.2')
      .call(
        d3.axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => ''),
      )

    const tooltip = d3.select(this.container.current).append('div')
      .attr('class', 'tooltip')

    chart.append('g')
      .attr('class', 'datagroup')
      .attr('transform', 'translate(-7, 0)')
      .selectAll('rect')
        .data(data)
        .enter()
      .append('rect')
        .attr('x', (d: any) => xScale(moment(`${d.year}-01-01`)))
        .attr('y', yScale(0))
        .attr('width', '15')
        .attr('height', () => chartHeight - yScale(0))
        .on('mouseenter', function(d: any) {
          const bar = this
          tooltip.html(d.count)
            .style('left', `${bar.getAttribute('x')}px`)
            .style('top', `${bar.getAttribute('y') || 0 - 30}px`)
        })
        .transition()
          .duration(500)
          .attr('height', (d: any) => chartHeight - yScale(d.count))
          .attr('y', (d: any) => yScale(d.count))
    /* eslint-enable indent */
  }

  reDrawChart(): void {
    const container = d3.select(this.container.current)

    container.select('svg').remove()
    container.select('.tooltip').remove()
    this.setDimensions()
  }

  render(): JSX.Element {
    const { height } = this.props

    return (
      <Chart
        style={{ height }}
        ref={this.container}
      />
    )
  }
}

export default BarChart
