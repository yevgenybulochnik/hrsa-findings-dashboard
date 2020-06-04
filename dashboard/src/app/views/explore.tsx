import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../rootReducer'
import { selectAuditEntry } from '../ducks/actions'
import { Table } from '../components/table'
import { FilterCard } from '../components/filterCard'
import InfoCard from '../components/infoCard/infoCard'

const FlexRow =  styled.div`
  display: flex;
  height: 400px;
  align-items: center;
`

interface Props {
  data: any;
  handleRowClick: any;
}

const Explore: React.SFC<Props> = (props) => {
  const { handleRowClick } = props
  const columns = React.useMemo(() =>[
        {
          Header: 'HRSA Findings Data',
          align: 'center',
          columns: [
            {
              Header: 'Audit Year',
              accessor: 'full_year',
              width: 1,
              align: 'center'
            },
            {
              Header: 'State',
              accessor: 'state',
              width: 1,
              align: 'center'
            },
            {
              Header: '340B Class',
              accessor: 'entity_abv',
              width: 1,
              align: 'center'
            },
            {
              Header: 'Entity Name',
              accessor: 'entity',
              width: 3,
              className: 'entity-name',
            },
            {
              Header: 'Audit Closure',
              accessor: 'closure_date',
              width: 2,
              align: 'center'
            },
          ]
        }
  ], [])

  return (
    <>
      <FlexRow>
        <FilterCard />
        <InfoCard />
      </FlexRow>
      <Table onRowClick={handleRowClick} height='300px' columns={columns} data={props.data}/>
    </>
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
