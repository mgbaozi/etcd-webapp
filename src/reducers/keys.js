import * as actions from '../actions'
import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

const initialState = Immutable.fromJS({
  keys: {},
  kvs: {},
})

export default createReducer(initialState, {
  [actions.KEYS.SUCCESS](state, action) {
    const keys = Immutable.fromJS(action.response.kvs)
      .reduce((result, item) => {
        const splited = item.split('/')
        for (let i = 0; i < splited.length - 1; i++) {
          splited[i] = `${splited[i]}/`
        }
        const value = result.getIn(splited)
        if (value === undefined) {
          result = result.setIn(splited, null)
        }
        return result
      }, new Immutable.Map())
    return state.set('keys', keys)
  },
  [actions.KV.SUCCESS](state, action) {
    const { key, value } = action.response.kvs[0]
    return state.setIn(['kvs', key], value)
  },
})
