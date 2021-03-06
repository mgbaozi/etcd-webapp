import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { LinkContainer } from 'react-router-bootstrap'
import { Grid, Row, Col } from 'react-bootstrap'
import { Panel } from 'react-bootstrap'
import { ListGroup, ListGroupItem, Breadcrumb } from 'react-bootstrap'
import { fetchKey, fetchKeys } from '../actions'

class KeyValue extends Component {

  static propTypes = {
    match: PropTypes.object,
    fetchKey: PropTypes.func.isRequired,
    fetchKeys: PropTypes.func.isRequired,
    keys: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { match } = this.props
    this.props.fetchKeys()
    if (this.showValue()) {
      this.props.fetchKey(match.params[0])
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match } = this.props
    const { match: nextMatch } = nextProps
    if (match.params[0] !== nextMatch.params[0]) {
      if (this.showValue(nextProps)) {
        this.props.fetchKey(nextMatch.params[0])
      }
    }
  }

  showValue(props) {
    if (!props) {
      props = this.props
    }
    const prefix = props.match.params[0] || ''
    return prefix !== '' && !prefix.endsWith('/')
  }

  getKey(props) {
    if (!props) {
      props = this.props
    }
    return props.match.params[0]
  }

  getDir(props) {
    if (!props) {
      props = this.props
    }
    const prefix = props.match.params[0] || ''
    if (prefix === '') {
      return []
    } else if (prefix.endsWith('/')) {
      return prefix.slice(0, -1).split('/').map(item => `${item}/`)
    } else {
      return prefix.split('/').map(item => `${item}/`).slice(0, -1)
    }
  }

  render() {
    const { keys } = this.props
    const dir = this.getDir()
    const showValue = this.showValue()
    const keyList = dir ? keys.get('keys').getIn(dir, Immutable.Map()) : keys.get('keys')
    const keyListItems = keyList.map((item, key) => {
      return (
        <LinkContainer
          isActive={(match, location) => {
            return match && (match.path === location.pathname)
          }}
          key={`key-${key.replace(/\//, '--')}`}
          to={`/kv/${dir.join('')}${key}`}
        >
          <ListGroupItem>{key}</ListGroupItem>
        </LinkContainer>
      )
    }).toArray()
    const breadcrumbItems = dir.map((item, index) => {
      const link = dir.slice(0, index+1).join('')
      return (
        <LinkContainer
          key={`breadcrumb-${link}`}
          to={`/kv/${link}`}>
          <Breadcrumb.Item
          >
            {item.length > 1 ? item.substr(0, item.length-1) : item}
          </Breadcrumb.Item>
        </LinkContainer>
      )
    })
    return (
      <Grid>
        <Row>
          <Col md={6}>
            { dir.length ? (
              <Breadcrumb>
                <LinkContainer
                  key={`breadcrumb--home`}
                  to={`/kv`}>
                  <Breadcrumb.Item
                  >
                    HOME
                  </Breadcrumb.Item>
                </LinkContainer>
                {breadcrumbItems}
              </Breadcrumb>
            ): null
            }
            <ListGroup>{keyListItems}</ListGroup>
          </Col>
          {showValue ? (
            <Col md={6}>
              <Panel>
                <Panel.Heading>Value</Panel.Heading>
                <Panel.Body>
                  {keys.getIn(['kvs', this.getKey()])}
                </Panel.Body>
              </Panel>
            </Col>
          ) : null
          }
        </Row>
      </Grid>
    )
  }
}

export default connect(({ keys }) => ({ keys }), {
  fetchKey,
  fetchKeys,
})(KeyValue)
