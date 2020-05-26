import React from 'react'
import { Switch, Route } from 'react-router'
import Nav from 'components/navBar'
import Content from 'components/content'

interface State {

}

const navConfig: NavLink[] = [
  { id: 'overview', name: 'Overview', path: '/' },
  { id: 'explore', name: 'Explore', path: '/explore' }
]

class Dashboard extends React.Component<{}, State> {
  render() {
    return (
      <div>
        <Nav branding='HRSA Findings' navLinks={navConfig} />
        <Content>
          <Switch>
            <Route path='/explore'>
              Explore
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
