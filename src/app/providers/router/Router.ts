import AuthService from "../../../features/auth/by-credentials/model/AuthService.ts";
import { Page } from "../../../pages/page/ui/Page.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import {
  ChildrenMap,
  ChildrenSchema,
} from "../../../shared/lib/Component/model/children.types.ts";
import Store from "../store/Store.ts";
import Route from "./Route.ts";
import { IRoute, RouteConfigs, RouteLink } from "./types.ts";
import { extractParams, matchPath } from "./utils.ts";

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
   * Route is used due to contravariance
   */
  private _routes: IRoute[] = [];

  /** The actual route. */
  private _currentRoute: IRoute | null = null;

  constructor() {
    if (Router.__instance) return Router.__instance;

    Router.__instance = this;
  }

  /**
   * Registers a new Route with the Router.
   * @returns this for chaining
   */
  public use<
    TProps extends BaseProps,
    TMap extends ChildrenMap = ChildrenMap,
    TSchema extends ChildrenSchema<TMap> = ChildrenSchema<TMap>,
    TPage extends Page<TProps, TMap, TSchema> = Page<TProps, TMap, TSchema>,
  >(routeConfigs: RouteConfigs, pageFactory: () => TPage): this {
    const route = new Route({ routeConfigs, pageFactory });
    this._routes.push(route);
    return this;
  }

  /* Inits Router. Sets root query to existing Routes. */
  public async start(rootQuery: string): Promise<void> {
    try {
      /* Await this so the store is populated before we check routes */
      // await AuthService.fetchUser();
    } catch (_) {
      console.error("Failed to fetch user on startup");
    }

    this._routes.forEach((route) => route.setRootQuery(rootQuery));

    /* Adding listener that's triggered
      when the active history entry changes. */
    window.onpopstate = () => {
      this._onRouteChange(window.location.pathname);
    };

    /* Handling the nav-<a> links */
    document.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navLink = target.closest("nav a");

      if (navLink) {
        e.preventDefault();

        const path = navLink.getAttribute("href");

        if (path) {
          this.go(path as RouteLink);
        }
      }
    });

    /* Initial page load. */
    this._onRouteChange(window.location.pathname);
  }

  /* Is triggered when the URL changes. */
  private _onRouteChange(path: RouteLink | string): void {
    const route = this._routes.find((route) => matchPath(path, route.path));

    const isUserLoggedIn = Store.getState().isLoggedIn;

    if (!route) {
      this.go(RouteLink.NotFound);
      return;
    }

    if (!isUserLoggedIn && route.authStatus === "protected") {
      /* If user is not logged in and trying to access a protected route, leave the current route */
      console.warn("Protected route accessed by a guest");
      return;
    }

    if (isUserLoggedIn && route.authStatus === "guest") {
      /* If a guest-only route is accessed by a user, leave the current route */
      console.warn("Guest-only route accessed by a user");
      return;
    }

    const params = extractParams(path, route.path);
    route.setRouteConfigs({ params });

    this._currentRoute?.leave();
    this._currentRoute = route;
    this._currentRoute!.render();
  }

  public go(path: RouteLink): void {
    this._history.pushState({}, "", path);
    this._onRouteChange(path);
  }

  public back(): void {
    this._history.back();
  }

  public forward(): void {
    this._history.forward();
  }
}

export default new Router();
