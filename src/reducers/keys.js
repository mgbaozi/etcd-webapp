import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import * as ActionTypes from '../actions'

export default createReducer(Immutable.fromJS([]), {
  [ActionTypes.KEYS.SUCCESS](state, action) {
    const keys = action.response
    return Immutable.fromJS(keys)
  },
})
