import { combineReducers } from 'redux'
import { auditData }from './ducks/reducers'
import filterReducer from './components/filterCard/ducks/reducers'


const rootReducer = combineReducers({
  auditData,
  filters: filterReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
