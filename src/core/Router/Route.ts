import { BaseProps } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import { IRoute, IRouteConfigs } from "./router.d";
import { matchPath } from "./utils.ts";

/**
 * @class Route Represents a single application route.
 * Keeps the URL+Component pair.
 * Can create & show/hide the Component.
 */

export interface RouteProps {
  routeConfigs: IRouteConfigs;
  pageFactory: () => Component<BaseProps>;
}

/**
 * @implements IRoute for 'public contract' match
 */
export default class Route implements IRoute {
  private _rootQuery: string = "";
  private _routeConfigs: IRouteConfigs;
  /* Factory args are passed in index.ts */
  private _pageFactory: () => Component<BaseProps>;
  private _pageInstance: Component<BaseProps> | null = null;

  public get path(): string {
    return this._routeConfigs.path;
  }

  constructor({ routeConfigs, pageFactory }: RouteProps) {
    this._routeConfigs = routeConfigs;
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
