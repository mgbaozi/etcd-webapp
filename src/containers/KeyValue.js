import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchKeys } from '../actions'

class KeyValue extends Component {

  static propTypes = {
    fetchKeys: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.fetchKeys('')
  }

  render() {
    const { keys } = this.props
    const keyList = keys.kvs.map(item => {
      return (
        <h1>{window.atob(item.key)}</h1>
      )
    })
    return (
      <div>{keyList}</div>
    )
  }
}

// KeyValue.propTypes = {
//   fetchKeys: PropTypes.func.isRequired,
// }

export default connect(({ keys }) => ({ keys }), {
  fetchKeys,
})(KeyValue)
