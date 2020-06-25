

type RecordQueryParams = {
  years: string[];
  states: string[];
  hrsa_designations: string[];
  entity_keywords: string;
  findings_keywords: string;
  [ key: string ]: any;
}

function getRecords(queryParams: RecordQueryParams) {
  let url = '/api/records/'
  let queryString = '?'
  if (queryParams) {
    for (const key in queryParams) {
      if (queryParams[key].length) {
        queryString += `${key}=${queryParams[key]}`
      }
    }
    url += queryString
  }
  return fetch(url)
    .then((res) => res.json())
}

function getFilterItems() {
  return fetch('/api/filteritems/')
    .then((res) => res.json())
}

const dataService = {
  getRecords,
  getFilterItems,
}

export default dataService
