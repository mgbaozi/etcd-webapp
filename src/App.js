import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AppNav from './components/AppNav'
import KeyValue from './containers/KeyValue'
import Member from './containers/Member'
import Snapshot from './containers/Snapshot'
import './App.css'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <AppNav />
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
      </Router>
    )
  }
}

export default App
