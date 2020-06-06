import { combineReducers } from 'redux'
import { auditData, selectedAuditEntry }from './ducks/reducers'
import filterReducer from './components/filterCard/ducks/reducers'
import searchReducer from './components/searchCard/ducks/reducers'


const rootReducer = combineReducers({
  auditData,
  selectedAuditEntry,
  filters: filterReducer,
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
