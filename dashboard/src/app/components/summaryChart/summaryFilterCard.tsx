import React from 'react'
import styled from 'styled-components'
import { Switch, Card, Elevation } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import StateSelector from '../filterCard/selectors/stateSelector'
import HrsaDesSelector from '../filterCard/selectors/hrsaDesSelector'
import * as actions from './ducks/actions'
import { RootState } from '../../rootReducer'

const Container = styled.div`
`

interface Props {
  stateItems: any;
  selectedStates: any[];
  onStateSelect: any;
  onStateTagRemove: any;
  hrsaDesItems: any;
  selectedHrsaDes: any;
  onHrsaDesSelect: any;
  onHrsaDesTagRemove: any;
  onTotalToggle: any;
}

const SummaryFilterCard: React.SFC<Props> = (props) => {
  const {
    stateItems,
    selectedStates,
    onStateSelect,
    onStateTagRemove,
    onTotalToggle,
    hrsaDesItems,
    selectedHrsaDes,
    onHrsaDesSelect,
    onHrsaDesTagRemove,
  } = props

  return (
    <Card elevation={Elevation.TWO}>
      <Container>
        <StateSelector
          stateItems={stateItems}
          selectedStates={selectedStates}
          onItemSelect={onStateSelect}
          onTagRemove={onStateTagRemove}
        />
        <HrsaDesSelector
          hrsaDesItems={hrsaDesItems}
          selectedHrsaDess={selectedHrsaDes}
          onItemSelect={onHrsaDesSelect}
          onTagRemove={onHrsaDesTagRemove}
        />
        <Switch
          large
          label='Hide Totals'
          onChange={onTotalToggle}
        />
      </Container>
    </Card>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    stateItems: state.filterItems.state_items,
    selectedStates: state.summaryChart.selectedStates,
    hrsaDesItems: state.filterItems.hrsa_designation_items,
    selectedHrsaDes: state.summaryChart.selectedHrsaDes,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onStateSelect: (item: any) => dispatch(actions.addFilterItem('state', item)),
    onStateTagRemove: (item: any) => dispatch(actions.removeFilterItem('state', item)),
    onHrsaDesSelect: (item: any) => dispatch(actions.addFilterItem('hrsaDes', item)),
    onHrsaDesTagRemove: (item: any) => dispatch(actions.removeFilterItem('hrsaDes', item)),
    onTotalToggle: () => dispatch(actions.toggleTotals())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryFilterCard)
