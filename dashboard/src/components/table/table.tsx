import React from 'react'
import styled from 'styled-components'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, Elevation, Button } from '@blueprintjs/core'
import { useTable, useFlexLayout, usePagination } from 'react-table'
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

const Pagination = styled.div`
  display: flex;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
  border-top: 1px solid #d4d3d3;
`
const PageInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const PageInfoItem = styled.span`
  flex: 1;
  text-align: center;
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
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageCount,
    state: { pageIndex }
  } = useTable({
    columns,
    data,
    // @ts-ignore
    initialState: { pageSize: 50 }
  }, usePagination, useFlexLayout)

  return (
    <Card elevation={Elevation.TWO}>
      <Wrapper>
        <TableContainer {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup: any) => (
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
              {page.map((row: any) => {
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
          <Pagination>
            <Button style={{flex: 1}} minimal fill onClick={previousPage} disabled={!canPreviousPage}>Previous</Button>
            <PageInfo>
              <PageInfoItem>{pageIndex + 1}</PageInfoItem>
              <PageInfoItem>/</PageInfoItem>
              <PageInfoItem>{pageCount}</PageInfoItem>
            </PageInfo>
            <Button style={{flex: 1}} minimal fill onClick={nextPage} disabled={!canNextPage}>Next</Button>
          </Pagination>
        </TableContainer>
      </Wrapper>
    </Card>
  )
}

export default Table
