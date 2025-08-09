import { BaseProps } from "../../framework/Component/Component.d";
import { Page } from "../../pages/Page.ts";
import { IRoute, IRouteConfigs } from "./router.d";
import { matchPath } from "./utils.ts";

/**
 * @class Route Represents a single application route.
 * Keeps the URL+Component pair.
 * Can create & show/hide the Component.
 */

export interface RouteProps<TProps extends BaseProps> {
  routeConfigs: IRouteConfigs;
  pageFactory: () => Page<TProps>;
}

/**
 * @implements IRoute for 'public contract' match
 */
export default class Route<TProps extends BaseProps> implements IRoute {
  private _rootQuery: string = "";
  private _routeConfigs: IRouteConfigs;
  /* Factory args are passed in index.ts */
  private _pageFactory: () => Page<TProps>;
  private _pageInstance: Page<TProps> | null = null;

  public get path(): string {
    return this._routeConfigs.path;
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
      this._pageInstance.hide();
    }
  }

  public setRootQuery(next: string) {
    this._rootQuery = next;
  }

  public setRouteConfigs(nextConfigs: Partial<IRouteConfigs>): void {
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

      root.append(element);
    }

    this._pageInstance!.show();
  }
}
