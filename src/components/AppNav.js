import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

export default class AppNav extends Component {
  
  static propTypes = {
    clusters: PropTypes.object,
    current: PropTypes.string,
    pathname: PropTypes.string,
  }

  render() {
    const { clusters, current, pathname } = this.props
    const menuItems = clusters.map(cluster => {
      const name = cluster.get('name')
      return (
        <LinkContainer
          key={`cluster-${name}`}
          to={`${pathname}?cluster=${name}`}>
          <MenuItem
          >
            {name}
          </MenuItem>
        </LinkContainer>
      )
    })
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Etcd Admin</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/kv">
            <NavItem>Key / Value</NavItem>
          </LinkContainer>
          <LinkContainer to="/member">
            <NavItem>Member</NavItem>
          </LinkContainer>
          <LinkContainer to="/snapshot">
            <NavItem>Snapshot</NavItem>
          </LinkContainer>
          <NavDropdown title={current} id="app-nav-cluster-selector">
            {menuItems}
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}
