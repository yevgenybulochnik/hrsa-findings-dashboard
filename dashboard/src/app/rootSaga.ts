import { all } from 'redux-saga/effects'
import commonSaga from './ducks/commonSaga'
import summaryChartSaga from './components/summaryChart/ducks/summaryChartSaga'


export default function* rootSaga() {
  yield all([
    commonSaga(),
    summaryChartSaga(),
  ])
}
