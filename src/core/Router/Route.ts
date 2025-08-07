import { BaseProps } from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import { IRoute, IRouteConfigs } from "./router.d";

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
  private _path: string;
  private _rootQuery: string = "";
  /* Factory args are passed in index.ts */
  private _pageFactory: () => Component<BaseProps>;
  private _pageInstance: Component<BaseProps> | null = null;

  public get path(): string {
    return this._path;
  }

  constructor({ routeConfigs, pageFactory }: RouteProps) {
    this._pageFactory = pageFactory;
    this._path = routeConfigs.path;
  }

  public navigate(_path: string) {
    if (this.match(_path)) {
      this._path = _path;
      this.render();
    }
  }

  public leave() {
    if (this._pageInstance) {
      this._pageInstance.hide();
    }
  }

  public match(_path: string): boolean {
    return this._path === _path;
  }

  public setRootQuery(next: string) {
    this._rootQuery = next;
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
