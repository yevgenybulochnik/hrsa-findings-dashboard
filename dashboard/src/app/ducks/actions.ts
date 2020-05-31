

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
