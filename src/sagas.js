import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import * as api from './api';


function* fetchKeys(action) {
  const { response, error } = yield call(actions.keys, api.fetchKeys)
  if (response) {
    yield put(actions.keys.success(response))
  }
}

function* sagas() {
  yield takeLatest(actions.KEYS.REQUEST, fetchKeys)
}

export default sagas
