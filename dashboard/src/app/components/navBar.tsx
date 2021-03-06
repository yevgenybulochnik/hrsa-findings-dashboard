import React from 'react'
import styled from 'styled-components'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Tabs, Tab, Navbar, Button, Popover, Menu, MenuItem } from '@blueprintjs/core'
import githubpng from './github.png'
import linkedinpng from './linkedin.png'

declare module "*.png"

const Styles = styled.div`
  .nav-tabs-desktop {
    display: None;
  }
  .nav-tabs-mobile {
  }
  @media(min-width: 750px) {
    .nav-tabs-desktop {
      display: block;
    }
    .nav-tabs-mobile {
      display: None;
    }
  }
`

const Spacer = styled.span`
  width: 50px;
`

const IconAnchor = styled.a`
  margin: 0 0.5em 0 0.5em;
  img {
    height: 2em;
  }
`

interface Props extends RouteComponentProps {
  branding: string;
  navLinks: NavLink[];
}

const Nav: React.SFC<Props> = (props) => {
  const {
    branding,
    navLinks,
    location,
    history
  } = props

  const setPathname = () => {
    if (location.pathname === '/') {
      return navLinks[0].path
    }
    return location.pathname
  }

  return (
    <Styles>
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>{branding}</Navbar.Heading>
          <Navbar.Divider />
        </Navbar.Group>
        <Navbar.Group>
          <IconAnchor href="https://github.com/yevgenybulochnik/hrsa-findings-dashboard">
            <img src={githubpng} alt="Github" />
          </IconAnchor>
          <IconAnchor href="https://www.linkedin.com/in/yevgeny-eugene-bulochnik-b429a6155/">
            <img src={linkedinpng} alt="Github" />
          </IconAnchor>
        </Navbar.Group>
        <Navbar.Group className='nav-tabs-desktop'>
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
        <Navbar.Group className='nav-tabs-mobile' align='right'>
          <Popover
            content={
              <Menu>
                {navLinks.map((navlink, id: number) => (
                  <MenuItem
                    key={`link-${id}`}
                    onClick={() => history.push(navlink.path)}
                    text={navlink.name}
                  />
                ))}
              </Menu>
            }
          >
            <Button>Menu</Button>
          </Popover>
        </Navbar.Group>
      </Navbar>
    </Styles>
  )
}

export default withRouter(Nav)
