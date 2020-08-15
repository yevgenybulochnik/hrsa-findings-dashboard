import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../rootReducer'
import { selectAuditEntry } from '../ducks/actions'
import { AuditEntryTable } from '../components/table'
import { FilterCard } from '../components/filterCard'
import { InfoCard }from '../components/infoCard'
import { SearchCard } from '../components/searchCard'

const SideBar = styled.div``

const MainDiv = styled.div``

const Container = styled.div`
  ${SideBar}, ${MainDiv} {
    > * {
      margin-bottom: 1em;
    }
  }

  @media(min-width: 1175px) {
    display: grid;
    grid-template-columns: 3fr 8fr;
    column-gap: 1em;
    row-gap: 1em;
    grid-template-areas:
      "filters main";
    margin: 1em;

    ${SideBar} {
      padding-top: 3em;
    }
  }
`

interface Props {
  data: any;
  handleRowClick: any;
}

const Explore: React.SFC<Props> = (props) => {
  const { handleRowClick } = props

  return (
    <Container>
      <SideBar>
        <FilterCard />
        <SearchCard />
      </SideBar>
      <MainDiv>
        <AuditEntryTable onRowClick={handleRowClick} height='250px' data={props.data}/>
        <InfoCard />
      </MainDiv>
    </Container>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    data: state.auditData
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleRowClick: (auditEntry: any) => dispatch(selectAuditEntry(auditEntry))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
