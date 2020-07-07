import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Sector } from 'recharts'


const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
}

interface Props {
}

const SummaryPieChart: React.SFC<Props> = (props) => {
  const [ data, setData ] = React.useState({pie1: [], pie2: []})
  const [ activeIndex, setActiveIndex ] = React.useState(undefined)

  React.useEffect(() => {
    const fetchData = async () => {
      let result = await fetch('/api/summary/findings/').then((res) => res.json())
      let findings = result.filter((res: any) => res.name !== 'no_findings')
      let no_findings = result.filter((res: any) => res.name === 'no_findings')
      let total = findings.reduce((acc: number, res: any) => acc + res.value, 0)
      no_findings.push({ name: 'findings', value: total})
      setData({pie1: findings, pie2: no_findings})
    }

    fetchData()
  }, [])

  return (
    <Card style={{height: '400px'}} elevation={Elevation.TWO}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data.pie1}
            dataKey='value'
            nameKey='name'
            fill="#82ca9d"
            innerRadius={20}
            outerRadius={60}
          />
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data.pie2}
            dataKey='value'
            nameKey='name'
            innerRadius={100}
            outerRadius={130}
            onMouseEnter={(data, index) => setActiveIndex(index)}
          />
          <Legend verticalAlign='top'/>
        </PieChart>
      </ResponsiveContainer>
     </Card>
  )
}

export default SummaryPieChart
