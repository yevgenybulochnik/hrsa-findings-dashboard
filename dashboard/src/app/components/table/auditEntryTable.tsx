import React from 'react'
import styled from 'styled-components'
import Table from './table'
import { Tag } from '@blueprintjs/core'


interface Props {
  data: any;
  height: any;
  onRowClick: any;
}

const PositiveFindings = styled(Tag)`
  background-color: #F55656;
  color: white;
`

const NoFindings = styled(Tag)`
  background-color: #15B371;
`


const AuditEntryTable: React.SFC<Props> = (props) => {
  const {
    data,
    height,
    onRowClick,
  } = props

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
            },
            {
              Header: 'OPA Findings',
              accessor: 'opa_findings',
              width: 1,
              align: 'center',
              Cell: ( cell: any) => {
                if (cell.value === 'No adverse findings') {
                  return <NoFindings>None</NoFindings>
                }
                return <PositiveFindings>Findings</PositiveFindings>
              }
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
    <Table height={height} columns={columns} data={data} onRowClick={onRowClick} />
  )
}

export default AuditEntryTable
