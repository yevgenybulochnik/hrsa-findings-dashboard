

export function fetchSummaryData() {
  return {
    type: 'FETCH_SUMMARY_DATA',
  } as const
}

export function fetchSummaryDataSuccess(data: any) {
  return {
    type: 'FETCH_SUMMARY_DATA_SUCCESS',
    payload: {
      data
    }
  } as const
}

export function fetchSummaryDataFailure(error: any) {
  return {
    type: 'FETCH_SUMMARY_DATA_FAILURE',
    payload: {
      error
    }
  } as const
}

export function fetchSummaryFindingsData() {
  return {
    type: 'FETCH_SUMMARY_FINDINGS_DATA',
  } as const
}

export function fetchSummaryFindingsDataSuccess(data: any) {
  return {
    type: 'FETCH_SUMMARY_FINDINGS_DATA_SUCCESS',
    payload: {
      data
    }
  } as const
}

export function fetchSummaryFindingsDataFailure(error: any) {
  return {
    type: 'FETCH_SUMMARY_FINDINGS_DATA_FAILURE',
    payload: {
      error
    }
  } as const
}

export function addFilterItem(filter: 'hrsaDes' | 'state' , item: any) {
  return {
    type: 'ADD_SUMMARY_FILTER_ITEM',
    payload: {
      filter,
      item
    }
  } as const
}

export function removeFilterItem(filter: 'hrsaDes' | 'state', item: any) {
  return {
    type: 'REMOVE_SUMMARY_FILTER_ITEM',
    payload: {
      filter,
      item
    }
  } as const
}

export function toggleTotals() {
  return {
    type: 'TOGGLE_SUMMARY_TOTALS',
  } as const
}
