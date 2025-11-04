import AuthService from "../../../features/authenticate/model/AuthService.ts";
import { Page } from "../../../pages/page/ui/Page.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { RouteLink } from "../../../shared/types/universal.ts";
import Store from "../store/model/Store.ts";
import Route from "./Route.ts";
import { RouteConfigs, RouteContract  } from "./types.ts";
import { extractParams, matchPath } from "./utils.ts";

/**
 * @class Router is a @mediator singleton class that listens
 *  to URL changes and calls the appropriate Route.
 *  E.g: '/sign-up -> new Route -> new AuthPage(SignUp)'
 * mimics History API.
 * handles the API access for the Pages.
 * @Singleton ensures there is only one central routing.
 * @Builder allowes chaining 'use()' calls.
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
   * list of all registered routes in the application
   * Route is used due to contravariance
   */
  private _routes: RouteContract[] = [];

  private _currentRoute: RouteContract | null = null;

  constructor() {
    if (Router.__instance) return Router.__instance;
    Router.__instance = this;
  }

  /**
   * registers a new Route with the Router.
   * @returns this for chaining
   */
  public use<P extends BaseProps, C extends Page<P>>(
    routeConfigs: RouteConfigs,
    pageFactory: () => C,
  ): this {
    const route = new Route({ routeConfigs, pageFactory });
    this._routes.push(route);
    return this;
  }

  /* inits Router; sets root query to existing Routes */
  public async start(rootQuery: string): Promise<void> {
    try {
      await AuthService.fetchUser();
    } catch (_) {
      console.error("Failed to fetch user on startup");
    }

    this._routes.forEach((route) => route.setRootQuery(rootQuery));

    /* adds listener that's triggered
      when the active history entry changes. */
    window.onpopstate = () => {
      this._onRouteChange(window.location.pathname);
    };

    /* for the nav-<a> links */
    document.addEventListener("click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const navLink = target.closest("nav a");

      if (navLink) {
        e.preventDefault();

        const path = navLink.getAttribute("href");

        if (path === "/logout") {
          AuthService.logout();
          return;
        }

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

    const isUserLoggedIn = Store.getState().controllers.isLoggedIn;

    if (!route) {
      console.warn("Route not found", path);
      this.go(RouteLink.NotFound);
      return;
    }

    /* If user is not logged in and trying to access a protected route,leave the current route */
    if (!isUserLoggedIn && route.authStatus === "protected") {
      console.warn("Protected route accessed by a guest");
      this.go(RouteLink.SignIn);
      return;
    }

    /* If a guest-only route is accessed by a user, leave the current route */
    if (isUserLoggedIn && route.authStatus === "guest") {
      console.warn("Guest-only route accessed by a user");
      this.go(RouteLink.NotFound);
      return;
    }

    const params = extractParams(path, route.path);
    route.setRouteConfigs({ params });

    this._currentRoute?.leave();
    this._currentRoute = route;
    this._currentRoute!.render();
    // console.log(this._routes);
    // console.log("CUR_ROUTE", this._currentRoute);
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
