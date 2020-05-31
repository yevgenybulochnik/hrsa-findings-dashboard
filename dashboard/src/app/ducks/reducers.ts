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
