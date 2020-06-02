/* eslint no-fallthrough: 0 */
import { FilterActionTypes } from './types'
import { combineReducers } from 'redux'


function selectedYears(state = [], action: FilterActionTypes): any[] {
  switch (action.type) {
    case 'ADD_FILTER_ITEM': {
      const { filter, item } = action.payload
      if (filter === 'year') {
        return [...state, item]
      }
    }
    case 'REMOVE_FILTER_ITEM': {
      const { filter, item } = action.payload
      if (filter === 'year') {
        const newState = state.filter((year: any) => year.year !== item)
        return newState
      }
    }
    default:
      return state
  }
}

function selectedStates(state = [], action: FilterActionTypes): any[] {
  switch (action.type) {
    case 'ADD_FILTER_ITEM': {
      const { filter, item } = action.payload
      if (filter === 'state') {
        return [...state, item]
      }
    }
    case 'REMOVE_FILTER_ITEM': {
      const { filter, item } = action.payload
      if (filter === 'state') {
        const newState = state.filter((usState: any) => usState.abv !== item )
        return newState
      }
    }
    default:
      return state
  }
}

function selectedHrsaDes(state = [], action: FilterActionTypes): any[] {
  switch (action.type) {
    case 'ADD_FILTER_ITEM': {
      const { filter, item } = action.payload
      if (filter === 'hrsaDes') {
        return [...state, item]
      }
    }
    case 'REMOVE_FILTER_ITEM': {
      const { filter, item } = action.payload
      if (filter === 'hrsaDes') {
        const newState = state.filter((hrsaDes: any) => hrsaDes.abv !== item )
        return newState
      }
    }
    default:
      return state
  }
}
const filterReducer = combineReducers({
  selectedStates,
  selectedYears,
  selectedHrsaDes,
})


export default filterReducer
