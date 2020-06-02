type ActionCreators = typeof import('./actions');

export type FilterActionTypes = {
  [Name in keyof ActionCreators]: ActionCreators[Name] extends ((...args: any[]) => any)
    ? ReturnType<ActionCreators[Name]>
    : never
}[keyof ActionCreators];
