import React, { Component } from 'react'
import { connect } from 'react-redux'

class KeyValue extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <h1>KV</h1>
    )
  }
}

export default connect(null, {
})(KeyValue)
