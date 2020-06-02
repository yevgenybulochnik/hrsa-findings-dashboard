import { all, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { CommonActionTypes } from './types'
import * as actions from './actions'


// Test query setup
import { RootState } from '../rootReducer'

const getFilterSelections = (state: RootState) => {
  const queryParams: any = {
    // @ts-ignore
    years: state.filters.selectedYears.map((item: any) => item.year),
    // @ts-ignore
    states: state.filters.selectedStates.map((item: any) => item.abv),
    // @ts-ignore
    hrsa_designations: state.filters.selectedHrsaDes.map((item: any) => item.abv)
  }

  let queryString = '/api/records/?'

  for (let key in queryParams) {
    if (queryParams[key].length) {
      console.log(queryParams[key])
      queryString += `${key}=${queryParams[key]}&`
    }
  }

  return queryString
}


// Workers

function* fetchData() {
  try {
    const apiQuery = yield select(getFilterSelections)
    const data = yield fetch(apiQuery)
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
  yield takeLatest(['FETCH_AUDIT_DATA', 'ADD_FILTER_ITEM', 'REMOVE_FILTER_ITEM'], fetchData)
}


// Saga

function* commonSaga() {
  yield all([
    fetchDataWatcher(),
    init(),
  ])
}

export default commonSaga
