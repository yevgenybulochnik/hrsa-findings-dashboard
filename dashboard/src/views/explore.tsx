import React from 'react'

// Place holder for now
const columns = [
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
]
