import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppNav from './components/AppNav'
import KeyValue from './containers/KeyValue'
import Member from './containers/Member'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <AppNav />
          <div className="container">
            <Route exact path="/" component={Member}/>
            <Route exact path="/kv" component={KeyValue}/>
            <Route exact path="/kv/*" component={KeyValue}/>
            <Route exact path="/member" component={Member}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
