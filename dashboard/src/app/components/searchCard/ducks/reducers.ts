import { SearchActionTypes } from './types'
import { combineReducers } from 'redux'


function entityKeyword(state = '', action: SearchActionTypes): string {
  switch (action.type) {
    case 'SET_ENTITY_KEYWORDS': {
      const { keyword } = action.payload
      return keyword
    }
    default:
      return state
  }
}

function findingsKeyword(state = '', action: SearchActionTypes): string {
  switch (action.type) {
    case 'SET_FINDINGS_KEYWORDS': {
      const { keyword } = action.payload
      return keyword
    }
    default:
      return state
  }
}

const searchReducer = combineReducers({
  entityKeyword,
  findingsKeyword,
})

export default searchReducer
