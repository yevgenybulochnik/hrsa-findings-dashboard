import React from 'react'
import styled from 'styled-components'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Card, Elevation } from '@blueprintjs/core'
import { RootState } from '../../rootReducer'
import YearSelector from './selectors/yearSelector'
import StateSelector from './selectors/stateSelector'
import HrsaDesSelector from'./selectors/hrsaDesSelector'
import * as actions from './ducks/actions'

// Temporary data imports, will be removed once api endpoints created
import yearData from '../../data/years.json'
import hrsaDes from '../../data/hrsaDes.json'
import states from '../../data/states.json'


interface Props {
  // yearItems: any;
  // stateItems: any;
  // hrsaDesItems: any;
  selectedYears: any;
  selectedStates: any;
  selectedHrsaDes: any;
  onStateSelect: any;
  onYearSelect: any;
  onHrsaDesSelect: any;
  onHrsaDesTagRemove: any;
  onYearTagRemove: any;
  onStateTagRemove: any;
}

const StyledCard = styled(Card)`
  margin-bottom: 1em;
  max-width: 20rem;
`


const FilterCard: React.SFC<Props> = (props) => {
  const {
    selectedYears,
    selectedStates,
    selectedHrsaDes,
    onStateSelect,
    onYearSelect,
    onHrsaDesSelect,
    onHrsaDesTagRemove,
    onYearTagRemove,
    onStateTagRemove,
  } = props

  return (
    <StyledCard elevation={Elevation.TWO}>
      <YearSelector
        yearItems={yearData}
        selectedYears={selectedYears}
        onItemSelect={onYearSelect}
        onTagRemove={onYearTagRemove}
      />
      <StateSelector
        stateItems={states as any}
        selectedStates={selectedStates}
        onItemSelect={onStateSelect}
        onTagRemove={onStateTagRemove}
      />
      <HrsaDesSelector
        hrsaDesItems={hrsaDes as any}
        selectedHrsaDess={selectedHrsaDes}
        onItemSelect={onHrsaDesSelect}
        onTagRemove={onHrsaDesTagRemove}
      />
    </StyledCard>
  )
}


const mapStateToProps = (state: RootState) => {
  return {
    selectedYears: state.filters.selectedYears,
    selectedStates: state.filters.selectedStates,
    selectedHrsaDes: state.filters.selectedHrsaDes,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onYearSelect: (item: any) => dispatch(actions.addFilterItem('year', item)),
    onStateSelect: (item: any) => dispatch(actions.addFilterItem('state', item)),
    onHrsaDesSelect: (item: any) => dispatch(actions.addFilterItem('hrsaDes', item)),
    onYearTagRemove: (item: any) => dispatch(actions.removeFilterItem('year', item)),
    onStateTagRemove: (item: any) => dispatch(actions.removeFilterItem('state', item)),
    onHrsaDesTagRemove: (item: any) => dispatch(actions.removeFilterItem('hrsaDes', item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterCard)
