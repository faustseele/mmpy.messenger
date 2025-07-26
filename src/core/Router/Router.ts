import { ComponentProps } from "../../framework/Component/Component.d";
import Route, { IRoute, IRouteProps } from "./Route.ts";
import { RouteLink } from "./router.d";

/**
 * @class Router is a @mediator singleton class that listens
 *  to URL changes and calls the appropriate Route.
 *  E.g: '/sign-up -> new Route -> new AuthPage(SignUp)'
 * Mimics History API.
 * Handles the API access for the Pages.
 * @Singleton to ensure there is only one central routing.
 * @Builder to allow chaining 'use()' calls.
 */

class Router {
  /** The single instance of the Router. */
  private static __instance: Router;

  /**
   * History API object.
   * Used for handling address bar without page reload.
   * Used to add entries to the browser's history stack for navigation.
   */
  private _history: History = window.history;

  /**
   * A list of all registered routes in the application.
   * IRoute is used due to contravariance
   */
  private _routes: IRoute[] = [];

  /** The actual route. */
  private _currentRoute: IRoute | null = null;

  /* The query selector for the root DOM element. E.g. '#app' */
  // private _rootQuery: string = "";

  constructor() {
    if (Router.__instance) return Router.__instance;

    Router.__instance = this;
  }

  /* Is triggered when the URL changes. */
  private _onRouteChange(pathname: RouteLink | string): void {
    const route = this._routes.find((route) => route.pathname === pathname);

    if (route) {
      this._currentRoute?.leave();
      this._currentRoute = route;
      this._currentRoute.render();
    } else {
      console.error(`Route not found: ${pathname}`);
    }
  }

  /* Inits Router. Sets root query to existing Routes. */
  public start(rootQuery: string): void {
    // this._rootQuery = rootQuery;
    this._routes.forEach((route) => (route.rootQuery = rootQuery));

    /* Adding listener that's triggered
      when the active history entry changes. */
    window.onpopstate = () => this._onRouteChange(window.location.pathname);

    /* Initial page load. */
    this._onRouteChange(window.location.pathname);
  }

  /**
   * Registers a new Route with the Router.
   * @returns this for chaining
   */
  public use<P extends ComponentProps>(routeProps: IRouteProps<P>) {
    const route = new Route(routeProps);
    this._routes.push(route);

    return this;
  }

  public go(pathname: RouteLink): void {
    this._history.pushState({}, "", pathname);
    this._onRouteChange(pathname);
  }

  public back(): void {
    this._history.back();
  }

  public forward(): void {
    this._history.forward();
  }
}

export default new Router();
