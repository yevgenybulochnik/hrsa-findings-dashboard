import { RootState } from '../rootReducer'

export const getFilterSelections = (state: RootState) => {
  return {
    // @ts-ignore
    years: state.filters.selectedYears.map((item: any) => item.year),
    // @ts-ignore
    states: state.filters.selectedStates.map((item: any) => item.abv),
    // @ts-ignore
    hrsa_designations: state.filters.selectedHrsaDes.map((item: any) => item.abv),
    entity_keywords: state.search.entityKeyword,
    findings_keywords: state.search.findingsKeyword,
  }
}
