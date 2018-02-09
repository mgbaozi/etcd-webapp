import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Row, Col } from 'react-bootstrap'
import { Panel } from 'react-bootstrap'
import { fetchMembers, fetchMemberStatus } from '../actions'

class Member extends Component {

  static propTypes = {
    match: PropTypes.object,
    fetchMembers: PropTypes.func.isRequired,
    fetchMemberStatus: PropTypes.func.isRequired,
    members: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchMembers()
  }

  render() {
    const { members } = this.props
    const memberList = members.get('members')
    const memberListItems = memberList.map((member) => {
      const id = member.get('ID')
      const status = members.getIn(['status', id], Immutable.Map())
      const leader = id === status.get('leader')
      return (
        <Panel key={`member-${id}`} bsStyle={leader ? 'success' : 'info'}>
          <Panel.Heading>{member.get('name')}{leader ? ' (LEADER)' : ''}</Panel.Heading>
          <Panel.Body>
            <Row>
              <Col md={6}>ID: {id}</Col>
              <Col md={6}>Client URL: {member.get('clientURLs')}</Col>
              <Col md={6}>Peer URL: {member.get('peerURLs')}</Col>
              <Col md={6}>DB Size: {status.get('dbSize')}</Col>
              <Col md={6}>Revision: {status.getIn(['header', 'revision'])}</Col>
            </Row>
          </Panel.Body>
        </Panel>
      )
    })
    return (
      <div>{memberListItems}</div>
    )
  }
}

export default connect(({ members }) => ({ members }), {
  fetchMembers,
  fetchMemberStatus,
})(Member)
