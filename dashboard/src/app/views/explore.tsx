import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../rootReducer'
import { Table } from '../components/table'

// Place holder for now

interface Props {
  data: any;
}

const Explore: React.SFC<Props> = (props) => {
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
    <div>
      <Table height='300px' columns={columns} data={props.data}/>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    data: state.auditData
  }
}

export default connect(mapStateToProps)(Explore)
