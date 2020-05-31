import { all } from 'redux-saga/effects'
import commonSaga from './ducks/commonSaga'


export default function* rootSaga() {
  yield all([
    commonSaga()
  ])
}
