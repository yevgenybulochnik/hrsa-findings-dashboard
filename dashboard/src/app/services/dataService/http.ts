
type RecordQueryParams = {
  years: string[];
  states: string[];
  hrsa_designations: string[];
  entity_keywords: string;
  findings_keywords: string;
  [ key: string ]: any;
}

export function getRecords(queryParams: RecordQueryParams) {
  let url = '/api/records/'
  let queryStrings = []
  if (queryParams) {
    for (const key in queryParams) {
      if (queryParams[key].length) {
        queryStrings.push(`${key}=${queryParams[key]}`)
      }
    }
    url += `?${queryStrings.join('&')}`
  }
  return fetch(url)
    .then((res) => res.json())
}

export function getFilterItems() {
  return fetch('/api/filteritems/')
    .then((res) => res.json())
}

type SummaryQueryParams = {
  states: string[];
  [ key: string ]: any;
}

export function getSummary(queryParams: SummaryQueryParams) {
  let url = '/api/summary/'
  let queryStrings = []
  if (queryParams) {
    for (const key in queryParams) {
      if (queryParams[key].length) {
        queryStrings.push(`${key}=${queryParams[key]}`)
      }
    }
    url += `?${queryStrings.join('&')}`
  }
  return fetch(url)
    .then((res) => res.json())
}

export function getSummaryFindings(queryParams: SummaryQueryParams) {
  let url = '/api/summary/findings/'
  let queryStrings = []
  if (queryParams) {
    for (const key in queryParams) {
      if (queryParams[key].length) {
        queryStrings.push(`${key}=${queryParams[key]}`)
      }
    }
    url += `?${queryStrings.join('&')}`
  }
  return fetch(url)
    .then((res) => res.json())
}
