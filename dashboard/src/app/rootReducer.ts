import { combineReducers } from 'redux'
import { auditData, filterItems, selectedAuditEntry }from './ducks/reducers'
import filterReducer from './components/filterCard/ducks/reducers'
import searchReducer from './components/searchCard/ducks/reducers'
import summaryChartReducer from './components/summaryChart/ducks/reducers'


const rootReducer = combineReducers({
  auditData,
  selectedAuditEntry,
  filterItems,
  filters: filterReducer,
  search: searchReducer,
  summaryChart: summaryChartReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
