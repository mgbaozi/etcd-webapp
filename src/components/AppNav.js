import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

export default class AppNav extends Component {
  render() {
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
        </Nav>
      </Navbar>
    )
  }
}
