import { all, takeLatest, put, select } from 'redux-saga/effects'
import * as actions from './actions'
import dataService from '../../../services/dataService'
import { RootState } from '../../../rootReducer'

const getFilterSelections = (state: RootState) => {
  return {
    // @ts-ignore
    states: state.summaryChart.selectedStates.map((item: any) => item.abv),
    // @ts-ignore
    hrsa_designations: state.summaryChart.selectedHrsaDes.map((item: any) => item.abv)
  }
}


// Workers
function* fetchData() {
  try {
    const queryParams = yield select(getFilterSelections)
    const data = yield dataService.getSummary(queryParams)
    yield put(actions.fetchSummaryDataSuccess(data))
  } catch (error) {
    console.log(error)
  }
}

function* init() {
  yield put(actions.fetchSummaryData())
}

// Watchers

function* fetchDataWatcher() {
  yield takeLatest(
    [
      'FETCH_SUMMARY_DATA',
      'ADD_SUMMARY_FILTER_ITEM',
      'REMOVE_SUMMARY_FILTER_ITEM',
    ],
    fetchData
  )
}

// Saga

function* summaryChartSaga() {
  yield all([
    fetchDataWatcher(),
    init()
  ])
}

export default summaryChartSaga
