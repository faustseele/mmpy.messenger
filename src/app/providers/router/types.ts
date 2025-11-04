/**
 * The 'public contract' for any Route
 * Ensures generic heterogeneity in arrays, e.g. _routes in Router. Homogenious generics wouldn't need this
 * Defines the invariant API (common methods/properties) without generics, acting as a supertype
 * Class Route<...> implements Route makes every Route instance assignable to Route
 * Avoids unnecessary casting: polymorphism
 * Covariance in a win for the array: subtypes Route<Specific> are assignable to supertype array Route[]
 */
export interface RouteContract {
  /* Eslint doesn't get that params are used */
  setRootQuery(next: string): void;
  setRouteConfigs(nextConfigs: Partial<RouteConfigs>): void;
  leave(): void;
  render(): void;
  /* Getters */
  readonly path: string;
  readonly authStatus: AuthStateType;
}

export type AuthStateType = "protected" | "guest" | "any";

export interface RouteConfigs {
  path: string;
  rootQuery: string;
  authStatus: AuthStateType;
  params: Record<string, string>;
}
