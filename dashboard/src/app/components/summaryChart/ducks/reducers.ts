/* eslint no-fallthrough: 0 */
import { SummaryChartActionTypes } from './types'
import { combineReducers } from 'redux'


function summaryData(state = [], action: SummaryChartActionTypes) {
  switch (action.type) {
    case 'FETCH_SUMMARY_DATA_SUCCESS': {
      const { data } = action.payload
      return data
    }
    default:
      return state
  }
}

function summaryFindingsData(state = {summary: [], totals: []}, action: SummaryChartActionTypes) {
  switch (action.type) {
    case 'FETCH_SUMMARY_FINDINGS_DATA_SUCCESS': {
      const { data } = action.payload
      const findings = data.filter((d: any) => d.name !== 'No Findings' && d.name !== 'Findings')
      const totals = data.filter((d: any) => d.name === 'No Findings' || d.name === 'Findings')
      return {
        summary: findings,
        totals: totals
      }
    }
    default:
      return state
  }
}

function selectedStates(state = [], action: SummaryChartActionTypes) {
  switch (action.type) {
    case 'ADD_SUMMARY_FILTER_ITEM': {
      const { filter, item } = action.payload
      if (filter === 'state') {
        return [...state, item]
      }
    }
    case 'REMOVE_SUMMARY_FILTER_ITEM': {
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

function selectedHrsaDes(state = [], action: SummaryChartActionTypes) {
  switch (action.type) {
    case 'ADD_SUMMARY_FILTER_ITEM': {
      const { filter, item } = action.payload
      if (filter === 'hrsaDes') {
        return [...state, item]
      }
    }
    case 'REMOVE_SUMMARY_FILTER_ITEM': {
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

function totalToggleChecked(state = true, action: SummaryChartActionTypes) {
  switch (action.type) {
    case 'TOGGLE_SUMMARY_TOTALS': {
      return !state
    }
    default:
      return state
  }
}

const summaryChartReducer = combineReducers({
  summaryData,
  summaryFindingsData,
  selectedStates,
  selectedHrsaDes,
  totalToggleChecked,
})

export default summaryChartReducer
