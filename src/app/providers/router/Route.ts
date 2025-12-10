import { Page } from "@pages/page/ui/Page.ts";
import { ROOT_QUERY } from "@shared/config/dom.ts";
import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { AuthStateType, RouteConfigs, RouteContract } from "./types.ts";
import { matchPath } from "./utils.ts";

/**
 * @class Route Represents a single application route.
 * Keeps the URL+Component pair.
 * Can create & show/hide the Component.
 */

export interface RouteProps<Props extends BaseProps> {
  routeConfigs: RouteConfigs;
  pageFactory: () => Page<Props>;
}

/**
 * @implements Route for 'public contract' match
 */
export default class Route<
  Props extends BaseProps,
> implements RouteContract
{
  private _routeConfigs: RouteConfigs;
  /* Factory args are passed in index.ts */
  private _pageFactory: () => Page<Props>;
  private _pageInstance: Page<Props> | null = null;

  public get path(): string {
    return this._routeConfigs.path;
  }
  public get authStatus(): AuthStateType {
    return this._routeConfigs.authStatus;
  }

  constructor({ routeConfigs, pageFactory }: RouteProps<Props>) {
    this._routeConfigs = routeConfigs ?? {
      path: "",
      rootQuery: ROOT_QUERY,
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

      /* using bus to fully unmount the page */
      this._pageInstance.bus.emit("flow:component-did-unmount");
      this._pageInstance.element?.remove();
      /* Nullifing the instance to ensure it's recreated on next visit */
      this._pageInstance = null;
    }
  }

  public setRootQuery(next: string) {
    this._routeConfigs.rootQuery = next;
  }

  public setRouteConfigs(nextConfigs: Partial<RouteConfigs>): void {
    Object.assign(this._routeConfigs, nextConfigs);
  }

  public render() {
    if (!this._pageInstance) {
      this._pageInstance = this._pageFactory();

      this._pageInstance.setPageParams(this._routeConfigs.params);

      const root = document.querySelector(this._routeConfigs.rootQuery);
      const element = this._pageInstance!.element;

      if (!root || !element) {
        console.error("Root:", root, "Element:", element);
        return;
      }

      /* keeps root clean before appending new pg */
      root.textContent = "";

      root.append(element);
    }

  }
}
