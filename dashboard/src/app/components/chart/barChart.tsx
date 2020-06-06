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
    xScale: d3.scaleTime().domain([moment().startOf('month').subtract(1), moment().endOf('month')]),
    yScale: d3.scaleLinear().domain([0, 20]),
  }

  componentDidMount(): void {
    this.setDimensions()

    window.addEventListener('resize', this.onResize)
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

    const width = this.getWidth()
    const height = this.getHeight()

    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    this.setState({
      width,
      height,
      chartWidth,
      chartHeight,
      xScale: xScale.range([0, chartWidth]),
      yScale: yScale.range([chartHeight, 0]),
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
          .ticks(d3.timeDay.every(1))
          .tickFormat((t) => moment(t as Date).format('M/D')),
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
      .attr('opacity', '0.5')
      .call(
        d3.axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => ''),
      )

    chart.append('g')
      .attr('class', 'datagroup')
      .attr('transform', 'translate(-5, 0)')
      .selectAll('rect')
        .data(data)
        .enter()
      .append('rect')
        .attr('x', (d: any) => xScale(moment(d.timestamp).startOf('day')))
        .attr('y', yScale(0))
        .attr('width', '11')
        .attr('height', chartHeight - yScale(0))
        .transition()
          .duration(500)
          .attr('height', (d: any) => chartHeight - yScale(d.routes.length))
          .attr('y', (d: any) => yScale(d.routes.length))

    /* eslint-enable indent */
  }

  reDrawChart(): void {
    const container = d3.select(this.container.current)

    container.select('svg').remove()
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
