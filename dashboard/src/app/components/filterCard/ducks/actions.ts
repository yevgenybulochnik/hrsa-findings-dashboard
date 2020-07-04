

export function addFilterItem(filter: 'hrsaDes' | 'state' | 'year' | 'tag' , item: any) {
  return {
    type: 'ADD_FILTER_ITEM',
    payload: {
      filter,
      item
    }
  } as const
}

export function removeFilterItem(filter: 'hrsaDes' | 'state' | 'year' | 'tag', item: any) {
  return {
    type: 'REMOVE_FILTER_ITEM',
    payload: {
      filter,
      item
    }
  } as const
}
