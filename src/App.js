import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import Root from './containers/Root'
import './App.css'


class App extends Component {

  render() {
    const AppRoot = withRouter(props => <Root {...props}/>)
    return (
      <Router>
        <AppRoot />
      </Router>
    )
  }
}

export default App
