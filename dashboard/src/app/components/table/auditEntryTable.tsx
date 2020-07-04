import React from 'react'
import styled from 'styled-components'
import Table from './table'
import { Tag } from '@blueprintjs/core'


interface Props {
  data: any;
  height: any;
  onRowClick: any;
}

const FindingTag = styled(Tag)`
  margin: 0 1px 1px 0;
`

const GpoProhibtion = styled(FindingTag)`
  background-color: #008075;
  color: white;
`

const Diversion = styled(FindingTag)`
  background-color: #DB3737;
  color: white;
`

const Database = styled(FindingTag)`
  background-color: #F29D49;
`

const Duplicate = styled(FindingTag)`
  background-color: #A854A8;
  color: white;
`

const NoFindings = styled(FindingTag)`
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
          Header: `HRSA Audit Findings (${data.length})`,
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
              accessor: 'hrsa_des',
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
              accessor: 'tags',
              width: 2,
              align: 'center',
              Cell: ( cell: any) => {
                return cell.value.map((finding: any, i: number) => {
                  if (finding === 'No Findings') {
                    return <NoFindings key={i+1}>{finding}</NoFindings>
                  }
                  if (finding === 'GPO Prohibition') {
                    return <GpoProhibtion key={i+1}>{finding}</GpoProhibtion>
                  }
                  if (finding === 'Diversion') {
                    return <Diversion key={i+1}>{finding}</Diversion>
                  }
                  if (finding === 'Duplicate Discounts') {
                    return <Duplicate key={i+1}>{finding}</Duplicate>
                  }
                  if (finding === 'OPAIS Database') {
                    return <Database key={i+1}>OPAIS</Database>
                  }
                  if (finding === 'Misc') {
                    return <FindingTag key={i+1}>{finding}</FindingTag>
                  }
                })
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
  ], [data])
  return (
    <Table height={height} columns={columns} data={data} onRowClick={onRowClick} />
  )
}

export default AuditEntryTable
