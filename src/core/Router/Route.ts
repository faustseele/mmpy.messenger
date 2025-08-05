import {
  IComponentAttributes,
  IComponentConfigs,
  IComponentData,
  IComponentEvents,
} from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import { IPageConfigs } from "../../pages/page.d";
import { IRoute, IRouteConfigs } from "./router.d";

/**
 * @class Route Represents a single application route.
 * Keeps the URL+Component pair.
 * Can create & show/hide the Component.
 */

export interface RouteProps<
  C extends IComponentConfigs,
  A extends IComponentAttributes,
  E extends IComponentEvents,
  ConcreteComponent extends Component<C, A, E>,
> {
  componentData: IComponentData<C, A, E, ConcreteComponent>;
  routeConfigs: IRouteConfigs;
}

/**
 * @implements IRoute for 'public contract' match
 */
export default class Route<
  C extends IComponentConfigs,
  A extends IComponentAttributes,
  E extends IComponentEvents,
  ConcreteComponent extends Component<C, A, E>,
> implements IRoute
{
  private _path: string;
  private _rootQuery: string = "";
  private _componentData: IComponentData<C, A, E, ConcreteComponent>;
  private _pageInstance: ConcreteComponent | null = null;

  public get path(): string {
    return this._path;
  }
  public get pageConfigs(): IPageConfigs | object {
    return this._componentData.configs.pageConfigs ?? {};
  }

  constructor({
    componentData,
    routeConfigs,
  }: RouteProps<C, A, E, ConcreteComponent>) {
    this._componentData = componentData;
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
      this._pageInstance = this._componentData.componentFactory(
        this._componentData,
      );

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
