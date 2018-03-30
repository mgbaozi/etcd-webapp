import { combineReducers } from 'redux'
import keys from './keys'
import members from './members'
import snapshots from './snapshots'
import clusters from './clusters'

export default combineReducers({
  keys,
  members,
  snapshots,
  clusters,
})
