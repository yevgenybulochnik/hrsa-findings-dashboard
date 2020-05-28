import React from 'react'
import styled from 'styled-components'
import { Card, Elevation } from '@blueprintjs/core'
import YearSelector from './yearSelector'
import StateSelector from './stateSelector'
import HrsaDesSelector from'./hrsaDesSelector'


interface Props {
  yearItems: any;
  selectedYears: any;
  onYearSelect: any;
  stateItems: any;
  selectedStates: any;
  onStateSelect: any;
  hrsaDesItems: any;
  selectedHrsaDes: any;
  onHrsaDesSelect: any;
}

const StyledCard = styled(Card)`
  margin-bottom: 1em;
  max-width: 20rem;
`


const FilterCard: React.SFC<Props> = (props) => {
  const {
    yearItems,
    selectedYears,
    onYearSelect,
    stateItems,
    selectedStates,
    onStateSelect,
    hrsaDesItems,
    selectedHrsaDes,
  } = props

  return (
    <StyledCard elevation={Elevation.TWO}>
      <YearSelector
        yearItems={yearItems}
        selectedYears={selectedYears}
        onItemSelect={onYearSelect}
      />
      <StateSelector
        stateItems={stateItems}
        selectedStates={selectedStates}
        onItemSelect={onStateSelect}
      />
      <HrsaDesSelector
        hrsaDesItems={hrsaDesItems}
        selectedHrsaDess={selectedHrsaDes}
        onItemSelect={onStateSelect}
      />
    </StyledCard>
  )
}

export default FilterCard
