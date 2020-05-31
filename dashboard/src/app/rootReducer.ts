import { combineReducers } from 'redux'
import { auditData }from './ducks/reducers'


const rootReducer = combineReducers({
  auditData
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
