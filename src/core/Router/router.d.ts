/**
 * The 'public contract' for any Route
 * Ensures generic heterogeneity in arrays, e.g. _routes in Router. Homogenious generics wouldn't need this
 * Defines the invariant API (common methods/properties) without generics, acting as a supertype
 * Class Route<...> implements IRoute makes every Route instance assignable to IRoute
 * Avoids unnecessary casting: polymorphism
 * Covariance in a win for the array: subtypes Route<Specific> are assignable to supertype array IRoute[]
 */
export interface IRoute {
  /* Eslint doesn't get that params are used */
  // eslint-disable-next-line no-unused-vars
  setRootQuery(next: string): void;
  // eslint-disable-next-line no-unused-vars
  setRouteConfigs(nextConfigs: Partial<IRouteConfigs>): void;
  leave(): void;
  render(): void;
  /* Getters */
  readonly path: string;
}

/* Eslint doesn't like the enums */
/* eslint-disable no-unused-vars */
export enum RouteLink {
  SignUp = "/",
  SignIn = "/sign-in",
  Chats = "/messenger",
  Settings = "/settings",
  NotFound = "/404",
  Error = "/500",
}

export const guardLink = (link: unknown): link is RouteLink => {
  return typeof link === "string" && pageLinks.includes(link as RouteLink);
};

export interface IRouteConfigs {
  path: string;
  rootQuery: string;
  params: Record<string, string>;
}
