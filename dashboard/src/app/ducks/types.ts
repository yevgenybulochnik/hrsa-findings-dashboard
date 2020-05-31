type ActionCreators = typeof import('./actions');

export type CommonActionTypes = {
  [Name in keyof ActionCreators]: ActionCreators[Name] extends ((...args: any[]) => any)
    ? ReturnType<ActionCreators[Name]>
    : never
}[keyof ActionCreators];
