

export function setEntityKeywords(keyword: string) {
  return {
    type: 'SET_ENTITY_KEYWORDS',
    payload: {
      keyword
    }
  } as const
}

export function setFindingsKeywords(keyword: string) {
  return {
    type: 'SET_FINDINGS_KEYWORDS',
    payload: {
      keyword
    }
  } as const
}
