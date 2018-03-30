import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { parse } from 'qs'

import AppNav from '../components/AppNav'
import KeyValue from './KeyValue'
import Member from './Member'
import Snapshot from './Snapshot'

import { fetchClusters } from '../actions'

class Root extends Component {

  static propTypes = {
    clusters: PropTypes.object,
    location: PropTypes.object,
  }

  componentWillMount() {
    this.props.fetchClusters()
  }

  render() {
    const { clusters, location } = this.props
    const query = parse(location.search.substr(1))
    const current = query.cluster || clusters.get('current')
    return (
      <div className="app">
        <AppNav
          pathname={location.pathname}
          clusters={clusters.get('clusters')}
          current={current}
        />
        <div className="container">
          <Route exact path="/" render={() => (
            <Redirect to="/kv" />
          )}/>
          <Route exact path="/kv" component={KeyValue}/>
          <Route exact path="/kv/*" component={KeyValue}/>
          <Route path="/member" component={Member}/>
          <Route path="/snapshot" component={Snapshot}/>
        </div>
      </div>
    )
  }
}

export default connect(({ clusters }) => ({ clusters }), {
  fetchClusters,
})(Root)
