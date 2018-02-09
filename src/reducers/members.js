import * as actions from '../actions'
import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

const initialState = Immutable.fromJS({
  members: [],
  status: {},
})

export default createReducer(initialState, {
  [actions.MEMBERS.SUCCESS](state, action) {
    const members = Immutable.fromJS(action.response.members)
    return state.set('members', members)
  },
  [actions.STATUS.SUCCESS](state, action) {
    const status = Immutable.fromJS(action.response)
    return state.setIn(['status', action.response.header.member_id], status)
  },
})
