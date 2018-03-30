import * as actions from '../actions'
import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

const initialState = Immutable.fromJS({
  current: 'etcd',
  clusters: [],
})

export default createReducer(initialState, {
  [actions.CLUSTERS.SUCCESS](state, action) {
    const clusters = Immutable.fromJS(action.response.clusters)
    return state.set('clusters', clusters).set('current', action.response.default)
  },
})
