import { all, takeLatest, put, select } from 'redux-saga/effects'
import * as actions from './actions'
import { getFilterSelections } from './selectors'
import dataService from '../services/dataService'


// Workers

function* fetchData() {
  try {
    const queryParams = yield select(getFilterSelections)
    const data = yield dataService.getRecords(queryParams)
    yield put(actions.fetchAuditDataSuccess(data))
  } catch (error) {
    console.log(error)
  }
}

function* fetchFilterItems() {
  try {
    const data = yield dataService.getFilterItems()
    yield put(actions.fetchFilterItemsSuccess(data))
  } catch (error) {
    console.log(error)
  }
}

function* init() {
  yield put(actions.fetchAuditData())
  yield put(actions.fetchFilterItems())
}


// Watchers

function* fetchDataWatcher() {
  yield takeLatest(
    [
      'FETCH_AUDIT_DATA',
      'ADD_FILTER_ITEM',
      'REMOVE_FILTER_ITEM',
      'SET_FINDINGS_KEYWORDS',
      'SET_ENTITY_KEYWORDS'
    ], fetchData
  )
}

function* fetchFilterItemsWatcher() {
  yield takeLatest('FETCH_FILTER_ITEMS', fetchFilterItems)
}


// Saga

function* commonSaga() {
  yield all([
    fetchDataWatcher(),
    fetchFilterItemsWatcher(),
    init(),
  ])
}

export default commonSaga
