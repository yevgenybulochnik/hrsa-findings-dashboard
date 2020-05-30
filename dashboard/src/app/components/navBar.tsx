import React from 'react'
import styled from 'styled-components'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Tabs, Tab, Navbar } from '@blueprintjs/core'

const Spacer = styled.span`
  width: 50px;
`

interface Props extends RouteComponentProps {
  branding: string;
  navLinks: NavLink[];
}

const Nav: React.SFC<Props> = (props) => {
  const {
    branding,
    navLinks,
    location
  } = props

  const setPathname = () => {
    if (location.pathname === '/') {
      return navLinks[0].path
    }
    return location.pathname
  }

  return (
    <Navbar>
      <Navbar.Group>
        <Navbar.Heading>{branding}</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group>
        <Tabs selectedTabId={setPathname()} large={true} animate={true}>
          <Spacer />
          {navLinks.map(navlink => (
            <Tab
              key={navlink.id}
              id={navlink.path}
              title={<Link to={navlink.path}>{ navlink.name }</Link>}
            />
          ))}
        </Tabs>
      </Navbar.Group>
    </Navbar>
  )
}

export default withRouter(Nav)
