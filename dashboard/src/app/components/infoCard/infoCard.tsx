import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Card, Callout, Elevation } from '@blueprintjs/core'
import { RootState } from '../../rootReducer'


const StyledCard = styled(Card)`
  margin: 0 0 1em 1em;
  min-height: 20em;
  flex: 1;
`

const StyledCallout = styled(Callout)`
  margin-bottom: 0.5em;
`

interface Props {
  auditEntry: any
}


const InfoCard: React.SFC<Props> = (props) => {
  const {
    auditEntry,
  } = props


  return (
    <StyledCard elevation={Elevation.TWO}>
      { auditEntry ? (
        <>
          <StyledCallout title='Covered Entity'>
            {auditEntry.hrsa_id}-{auditEntry.entity}
          </StyledCallout>
          <StyledCallout title='Findings'>
            {auditEntry.opa_findings}
          </StyledCallout>
          <StyledCallout title='Sanctions'>
            {auditEntry.sanction}
          </StyledCallout>
          <StyledCallout title='CAP Status'>
            {auditEntry.cap_status}
          </StyledCallout>
        </>
      ) : (<div>None</div>) }
    </StyledCard>
  )
}

const mapStateToProps =  (state: RootState) => {
  console.log(state.auditData)
  return {
    auditEntry: state.selectedAuditEntry
  }
}

export default connect(mapStateToProps)(InfoCard)
