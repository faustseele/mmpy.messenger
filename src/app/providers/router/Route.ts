import { BaseProps } from "../../framework/Component/component.d";
import { Page } from "../../../pages/page/ui/Page.ts";
import { IRoute, RouteConfigs, AuthStateType } from "./types.ts";
import { matchPath } from "./utils.ts";

/**
 * @class Route Represents a single application route.
 * Keeps the URL+Component pair.
 * Can create & show/hide the Component.
 */

export interface RouteProps<TProps extends BaseProps> {
  routeConfigs: RouteConfigs;
  pageFactory: () => Page<TProps>;
}

/**
 * @implements Route for 'public contract' match
 */
export default class Route<TProps extends BaseProps> implements IRoute {
  private _rootQuery: string = "";
  private _routeConfigs: RouteConfigs;
  /* Factory args are passed in index.ts */
  private _pageFactory: () => Page<TProps>;
  private _pageInstance: Page<TProps> | null = null;

  public get path(): string {
    return this._routeConfigs.path;
  }
  public get authStatus(): AuthStateType {
    return this._routeConfigs.authStatus;
  }

  constructor({ routeConfigs, pageFactory }: RouteProps<TProps>) {
    this._routeConfigs = routeConfigs ?? {
      path: "",
      rootQuery: "",
      params: {},
    };
    this._pageFactory = pageFactory;
  }

  public navigate(path: string) {
    if (matchPath(this._routeConfigs.path, path)) {
      this.render();
    }
  }

  public leave() {
    if (this._pageInstance) {
      this._pageInstance.componentDidUnmount();
      this._pageInstance.element?.remove();
      /* Nullifing the instance to ensure it's recreated on next visit */
      this._pageInstance = null;
    }
  }

  public setRootQuery(next: string) {
    this._rootQuery = next;
  }

  public setRouteConfigs(nextConfigs: Partial<RouteConfigs>): void {
    Object.assign(this._routeConfigs, nextConfigs);
  }

  public render() {
    if (!this._pageInstance) {
      this._pageInstance = this._pageFactory();

      this._pageInstance.setPageParams(this._routeConfigs.params);

      const root = document.querySelector(this._rootQuery);
      const element = this._pageInstance!.element;

      if (!root || !element) {
        console.error("Root:", root, "Element:", element);
        return;
      }

      /* Ensuring the root is clean before appending the new Page */
      root.innerHTML = "";

      root.append(element);
    }

    this._pageInstance!.show();
  }
}
