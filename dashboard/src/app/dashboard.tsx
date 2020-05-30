import React from 'react'
import { Switch, Route } from 'react-router'
import Nav from './components/navBar'
import Content from './components/content'

const navConfig: NavLink[] = [
  { id: 'overview', name: 'Overview', path: '/' },
  { id: 'explore', name: 'Explore', path: '/explore' }
]

const Dashboard: React.SFC<{}> = () => {

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default Dashboard
