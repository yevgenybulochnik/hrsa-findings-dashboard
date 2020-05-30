import React from 'react'
import styled from 'styled-components'
import { Card, Elevation } from '@blueprintjs/core'
import YearSelector from './selectors/yearSelector'
import StateSelector from './selectors/stateSelector'
import HrsaDesSelector from'./selectors/hrsaDesSelector'


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
    onHrsaDesSelect,
  } = props

  return (
    <StyledCard elevation={Elevation.TWO}>
      <YearSelector
        yearItems={yearItems}
        selectedYears={selectedYears}
        onItemSelect={onYearSelect}
        onTagRemove={() => console.log('remove')}
      />
      <StateSelector
        stateItems={stateItems}
        selectedStates={selectedStates}
        onItemSelect={onStateSelect}
        onTagRemove={() => console.log('remove')}
      />
      <HrsaDesSelector
        hrsaDesItems={hrsaDesItems}
        selectedHrsaDess={selectedHrsaDes}
        onItemSelect={onHrsaDesSelect}
        onTagRemove={() => console.log('remove')}
      />
    </StyledCard>
  )
}

export default FilterCard
