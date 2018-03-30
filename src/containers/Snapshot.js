import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

import { fetchSnapshots } from '../actions'

class Snapshot extends Component {

  static propTypes = {
    fetchSnapshots: PropTypes.func.isRequired,
    snapshots: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchSnapshots()
  }

  render() {
    const { snapshots } = this.props
    const snapshotList = snapshots.get('snapshots')
    const snapshotListItem = snapshotList.map((snapshot, index) => {
      return (
        <ListGroupItem
          key={`key-snapshot-${index}`}
          bsStyle="success"
          header={snapshot.get('time')}>
          {snapshot.get('filename')}
        </ListGroupItem>
      )
    })
    return (
      <ListGroup>{snapshotListItem}</ListGroup>
    )
  }
}

export default connect(({ snapshots }) => ({ snapshots }), {
  fetchSnapshots,
})(Snapshot)
