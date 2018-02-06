import produce from 'immer'
import * as actions from '../actions'

const initialState = {
  kvs: [],
}

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch(action.type) {
      case actions.KEYS.SUCCESS:
        draft.kvs = action.response.kvs
    }
  })

export default reducer
