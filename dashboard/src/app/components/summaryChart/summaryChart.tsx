import React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import { connect } from 'react-redux'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { RootState } from '../../rootReducer'

interface Props {
  data: any;
  selectedStates: any[];
  toggleIsChecked: any;
}

const SummaryChart: React.SFC<Props> = (props) => {
  const {
    data,
    selectedStates,
    toggleIsChecked,
  } = props

  return (
    <Card style={{height: '400px'}} elevation={Elevation.TWO}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid />
          <YAxis
            label={{
              value: '# of Audits',
              angle: -90,
              position: 'insideLeft'
            }}
          />
          <XAxis dataKey='year'
            label={{
              value: 'Audit Year',
              offset: -5,
              position: 'insideBottom',
            }}
          />
          <Tooltip />
          {selectedStates.map((state: any) => <Bar key={state.id} dataKey={state.abv} fill={state.color} stackId='stack' />)}
          {toggleIsChecked && <Bar fill='#137cbd' dataKey='count' /> }
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    data: state.summaryChart.summaryData,
    selectedStates: state.summaryChart.selectedStates,
    toggleIsChecked: state.summaryChart.totalToggleChecked,
  }
}

export default connect(mapStateToProps, {})(SummaryChart)
