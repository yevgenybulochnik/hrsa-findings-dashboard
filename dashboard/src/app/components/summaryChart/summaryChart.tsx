import React from 'react'
import styled from 'styled-components'
import { Switch } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import StateSelector from '../filterCard/selectors/stateSelector'
import { RootState } from '../../rootReducer'
import * as actions from './ducks/actions'

const Container = styled.div`
  width: 100%;
`

const Filters = styled.div`
`

const Chart = styled.div`
  width: 100%;
  height: 300px;
`



interface Props {
  data: any;
  stateItems: any;
  selectedStates: any[];
  onStateSelect: any;
  onStateTagRemove: any;
  onTotalToggle: any;
  toggleIsChecked: any;
}

const SummaryChart: React.SFC<Props> = (props) => {
  const {
    data,
    stateItems,
    selectedStates,
    onStateSelect,
    onStateTagRemove,
    onTotalToggle,
    toggleIsChecked,
  } = props

  return (
    <Container>
      <Filters>
        <StateSelector
          stateItems={stateItems}
          selectedStates={selectedStates}
          onItemSelect={onStateSelect}
          onTagRemove={onStateTagRemove}
        />
        <Switch
          large
          label='Hide Totals'
          onChange={onTotalToggle}
        />
      </Filters>
      <Chart>
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
            {selectedStates.map((state: any) => <Bar onClick={() => console.log('test')} key={state.id} dataKey={state.abv} fill={state.color} stackId='stack' />)}
            {toggleIsChecked && <Bar fill='#137cbd' dataKey='count' /> }
          </BarChart>
        </ResponsiveContainer>
      </Chart>
    </Container>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    stateItems: state.filterItems.state_items,
    data: state.summaryChart.summaryData,
    selectedStates: state.summaryChart.selectedStates,
    toggleIsChecked: state.summaryChart.totalToggleChecked,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onStateSelect: (item: any) => dispatch(actions.addFilterItem('state', item)),
    onStateTagRemove: (item: any) => dispatch(actions.removeFilterItem('state', item)),
    onTotalToggle: () => dispatch(actions.toggleTotals())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryChart)
