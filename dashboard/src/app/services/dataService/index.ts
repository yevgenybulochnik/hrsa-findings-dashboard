import * as http from './http'
import * as local from './local'

let dataService: any = {}

if (process.env['REACT_APP_USE_LOCALSTORAGE']) {
  const rawData = require('./data/07-02-20-data.json')
  const stateItems = require('./data/states.json')
  const hrsaDesItems = require('./data/hrsa_abv.json')
  const tagsItems = require('./data/tags.json')
  local.setupData(rawData)
  local.setupFilterItems(stateItems, hrsaDesItems, tagsItems)

  dataService.getRecords = local.getRecords
  dataService.getSummary = local.getSummary
  dataService.getSummaryFindings = local.getSummaryFindings
  dataService.getFilterItems = local.getFilterItems
} else {
  dataService.getRecords = http.getRecords
  dataService.getSummary = http.getSummary
  dataService.getSummaryFindings = http.getSummaryFindings
  dataService.getFilterItems = http.getFilterItems
}


export default dataService
