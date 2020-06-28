

export function fetchAuditData() {
  return {
    type: 'FETCH_AUDIT_DATA',
  } as const
}

export function fetchAuditDataSuccess(data: any) {
  return {
    type: 'FETCH_AUDIT_DATA_SUCCESS',
    payload: {
      data
    }
  } as const
}

export function fetchAuditDataFailure(error: any) {
  return {
    type: 'FETCH_AUDIT_DATA_FAILURE',
    payload: {
      error
    }
  } as const
}

export function fetchFilterItems() {
  return {
    type: 'FETCH_FILTER_ITEMS',
  } as const
}

export function fetchFilterItemsSuccess(data: any) {
  return {
    type: 'FETCH_FILTER_ITEMS_SUCCESS',
    payload: {
      data
    }
  } as const
}

export function fetchFilterItemsFailure(error: any) {
  return {
    type: "FETCH_FILTER_ITEMS_FAILURE",
    payload: {
      error
    }
  } as const
}

export function selectAuditEntry(auditEntry: any) {
  return {
    type: 'SELECT_AUDIT_ENTRY',
    payload: {
      auditEntry
    }
  } as const
}
