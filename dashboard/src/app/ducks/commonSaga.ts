import { all, takeEvery, put } from 'redux-saga/effects'
import { CommonActionTypes } from './types'
import * as actions from './actions'


// Workers

function* fetchData() {
  try {
    const data = yield fetch('/api/records/')
      .then((res) => res.json())
    yield put(actions.fetchAuditDataSuccess(data))
  } catch (error) {
    console.log(error)
  }
}

function* init() {
  yield put(actions.fetchAuditData())
}


// Watchers

function* fetchDataWatcher() {
  yield takeEvery(['FETCH_AUDIT_DATA'], fetchData)
}


// Saga

function* commonSaga() {
  yield all([
    fetchDataWatcher(),
    init(),
  ])
}

export default commonSaga
