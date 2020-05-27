import React from 'react'
import { Switch, Route } from 'react-router'
import Nav from 'components/navBar'
import Content from 'components/content'
import Table from 'components/table'


const navConfig: NavLink[] = [
  { id: 'overview', name: 'Overview', path: '/' },
  { id: 'explore', name: 'Explore', path: '/explore' }
]

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

interface State {
  data: any;
}

class Dashboard extends React.Component<{}, State> {
  state: State = {
    data: []
  }

  componentDidMount() {
    fetch('/api/')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data
        })
      })
  }

  render() {
    const { data } = this.state

    return (
      <div>
        <Nav branding='HRSA Findings' navLinks={navConfig} />
        <Content>
          <Switch>
            <Route path='/explore'>
              <Table height='300px' columns={columns} data={data} />
            </Route>
            <Route path='/'>
              Overview
            </Route>
          </Switch>
        </Content>
      </div>
    )
  }
}

export default Dashboard
