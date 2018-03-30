import { combineReducers } from 'redux'
import keys from './keys'
import members from './members'
import snapshots from './snapshots'

export default combineReducers({
  keys,
  members,
  snapshots,
})
