import React from 'react'
import styled from 'styled-components'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, Elevation } from '@blueprintjs/core'
import { useTable, useFlexLayout } from 'react-table'
import 'react-perfect-scrollbar/dist/css/styles.css'


const Wrapper = styled.div`
  overflow: auto;
  border: 1px solid #d4d3d3;
`

const TableContainer = styled.div`
  width: 100%;
`

const Tr = styled.div`
  display: flex;
  border-bottom: 1px solid #d4d3d3;
`

const Th = styled.div<{align: string}>`
  oveflow-y: auto;
  overflow-x: hidden;
  text-align: ${props => props.align || 'left'};
  padding: 5px;
`

const Td = styled.div<{align: string}>`
  padding: 5px;
  text-align: ${props => props.align || 'left'};
`

const Thead = styled.div`
  box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
  ${Th} {
    border-right: 1px solid #d4d3d3;
    &:last-child {
      border-right: none;
    }
  }
`

const Tbody = styled.div<{height: string}>`
  height: ${props => props.height};
  overflow-y: auto;
  overflow-x: hidden;
`

interface Props {
  columns: any;
  data: any;
  height: string;
}

const Table: React.SFC<Props> = (props) => {
  const {
    columns,
    data,
    height
  } = props

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
  }, useFlexLayout)

  return (
    <Card elevation={Elevation.TWO}>
      <Wrapper>
        <TableContainer {...getTableProps()}>
          <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <Th {...column.getHeaderProps({align: column.align})}>
              {column.render('Header')}
              </Th>
            ))}
            </Tr>
          ))}
          </Thead>
          <Tbody {...getTableBodyProps()} height={height}>
            <PerfectScrollbar>
              {rows.map((row: any) => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <Td {...cell.getCellProps({align: cell.column.align})}>
                        {cell.render('Cell')}
                      </Td>
                    ))}
                </Tr>
                )
              })}
            </PerfectScrollbar>
          </Tbody>
        </TableContainer>
      </Wrapper>
    </Card>
  )
}

export default Table
