import { CommonActionTypes } from './types'


export function auditData(state = [], action: CommonActionTypes): any[] {
  switch (action.type) {
    case 'FETCH_AUDIT_DATA_SUCCESS': {
      const { data } = action.payload
      return data
    }
    default:
      return state
  }
}

const filterItemsInitState = {
  state_items: [],
  hrsa_designation_items: [],
  year_items: [],
  tag_items: [],
}

export function filterItems(state = filterItemsInitState, action: CommonActionTypes): any {
  switch (action.type) {
    case 'FETCH_FILTER_ITEMS_SUCCESS': {
      const { data } = action.payload
      return data
    }
    default:
      return state
  }
}

export function selectedAuditEntry(state = null, action: CommonActionTypes): any {
  switch (action.type) {
    case 'SELECT_AUDIT_ENTRY': {
      const { auditEntry } = action.payload
      return auditEntry
    }
    default:
      return state
  }
}
