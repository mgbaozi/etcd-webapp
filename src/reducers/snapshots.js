import * as actions from '../actions'
import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

const initialState = Immutable.fromJS({
  snapshots: {},
})

export default createReducer(initialState, {
  [actions.SNAPSHOTS.SUCCESS](state, action) {
    const snapshots = Immutable.fromJS(action.response.snapshots)
    return state.set('snapshots', snapshots)
  },
})
