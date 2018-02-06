import { all, call, put, fork, take, takeEvery } from 'redux-saga/effects'
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

export const fetchKeys = fetchEntity.bind(null, actions.keys, api.rangeKeys)


export function* rangeKeys(prefix) {
  yield call(fetchKeys, prefix)
}

export function* watchRangeKeys() {
  yield takeEvery(actions.FETCH_KEYS, function* x(action) {
    console.log(action)
    const { prefix } = action
    yield fork(rangeKeys, prefix)
  })
}

export function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    console.log('action', action)
  })
}

function* sagas() {
  yield all([
    fork(watchRangeKeys),
    fork(watchAndLog),
  ])
}

export default sagas
