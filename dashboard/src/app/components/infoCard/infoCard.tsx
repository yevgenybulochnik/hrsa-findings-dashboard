import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Card, Callout, Elevation } from '@blueprintjs/core'
import { RootState } from '../../rootReducer'


const StyledCard = styled(Card)`
  min-height: 20em;
`

const StyledCallout = styled(Callout)`
  margin-bottom: 0.5em;
`

const Filler = styled.div`
  background: rgba(138, 155, 168, 0.15);
  border-radius: 3px;
  text-align: center;
  padding-top: 9em;
  height: 20em;
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
      ) : (<Filler>...Please Click Row</Filler>) }
    </StyledCard>
  )
}

const mapStateToProps =  (state: RootState) => {
  return {
    auditEntry: state.selectedAuditEntry
  }
}

export default connect(mapStateToProps)(InfoCard)
