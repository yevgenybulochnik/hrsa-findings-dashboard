import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Sector } from 'recharts'


const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 2.5) * cos;
  const sy = cy + (outerRadius + 2.5) * sin;
  const mx = cx + (outerRadius + 7.5) * cos;
  const my = cy + (outerRadius + 7.5) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text fontSize="smaller" x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
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
      <text fontSize="smaller" x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Records: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
}

interface Props {
  data: any;
}

const SummaryPieChart: React.SFC<Props> = (props) => {
  const { data } = props
  const [ activeIndex, setActiveIndex ] = React.useState(undefined)

  return (
    <Card style={{height: '400px'}} elevation={Elevation.TWO}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            dataKey='value'
            nameKey='name'
            fill="#82ca9d"
            innerRadius='35%'
            outerRadius='50%'
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {
              data.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} />)
            }
          </Pie>
          <Legend verticalAlign='top'/>
        </PieChart>
      </ResponsiveContainer>
     </Card>
  )
}

export default SummaryPieChart
