import { all, call, put, fork, takeEvery } from 'redux-saga/effects'
import * as actions from './actions'
import * as api from './api';

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass id to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, url || id)
  if(response)
    yield put( entity.success(response, id) )
  else
    yield put( entity.failure(error, id) )
}

export const fetchKeys = fetchEntity.bind(null, actions.keys, api.fetchKeys)
export const fetchKey = fetchEntity.bind(null, actions.kv, api.fetchKey)

export const fetchMembers = fetchEntity.bind(null, actions.members, api.fetchMembers)
export const fetchMemberStatus = fetchEntity.bind(null, actions.status, api.fetchMemberStatus)

export function* getKey(key) {
  yield call(fetchKey, key)
}

export function* rangeKeys(prefix) {
  yield call(fetchKeys, prefix)
}

export function* getMembers() {
  yield call(fetchMembers)
}

export function* getMemberStatus(id) {
  yield call(fetchMemberStatus, id)
}

export function* watchGetKey() {
  yield takeEvery(actions.FETCH_KEY, function* get(action) {
    const { key } = action
    yield fork(getKey, key)
  })
}

export function* watchRangeKeys() {
  yield takeEvery(actions.FETCH_KEYS, function* range(action) {
    const { prefix } = action
    yield fork(rangeKeys, prefix)
  })
}

export function* watchGetMembers() {
  yield takeEvery(actions.FETCH_MEMBERS, function* get(action) {
    yield fork(getMembers)
  })
}

export function* watchGetMembersSuccess(id) {
  yield takeEvery(actions.MEMBERS.SUCCESS, function* get(action) {
    const members = action.response.members
    yield members.map(member => fork(getMemberStatus, member.ID))
  })
}

export function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    yield console.log('action', action)
  })
}

function* sagas() {
  yield all([
    fork(watchGetKey),
    fork(watchRangeKeys),
    fork(watchGetMembers),
    fork(watchGetMembersSuccess),
    fork(watchAndLog),
  ])
}

export default sagas
