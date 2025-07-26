import {
  IComponentChildren,
  ComponentConstructor,
  ComponentProps,
} from "../../framework/Component/Component.d";
import Component from "../../framework/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import { RouteLink } from "./router.d";

/**
 * @class Route Represents a single application route.
 * Keeps the URL+Component pair.
 * Can create & show/hide the Component.
 */

/* The 'public contract' for any Route. E.g. _routes in Router */
export interface IRoute {
  pathname: string;
  rootQuery: string;
  /* Eslint doesn't get that 'pathname' is used */
  // eslint-disable-next-line no-unused-vars
  match(pathname: string): boolean;
  leave(): void;
  render(): void;
}

export interface IRouteProps<P extends ComponentProps> {
  pathname: RouteLink;
  componentConstructor: ComponentConstructor<P>;
  optionalProps?: {
    componentProps?: P;
    childrenMap?: IComponentChildren;
  };
}

/**
 * @implements IRoute for 'public contract' match
 */
export default class Route<P extends ComponentProps> implements IRoute {
  public pathname: string;
  private _componentConstructor: ComponentConstructor<P>;

  private _componentInstance: Component | null = null;
  private _componentProps: P;
  private _childrenMap: IComponentChildren;

  public rootQuery: string = "";

  constructor(routeProps: IRouteProps<P>) {
    const { pathname, componentConstructor, optionalProps } = routeProps;
    this.pathname = pathname;
    this._componentConstructor = componentConstructor;

    this._componentProps =
      optionalProps?.componentProps || ({ configs: {} } as P);
    this._childrenMap = optionalProps?.childrenMap || {};
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._componentInstance) {
      this._componentInstance.hide();
    }
  }

  public match(pathname: string): boolean {
    return this.pathname === pathname;
  }

  public render() {
    if (!this._componentInstance) {
      const domService = new DOMService("article", {});
      const fragmentService = new FragmentService();

      this._componentInstance = new this._componentConstructor(
        this._componentProps,
        this._childrenMap,
        domService,
        fragmentService,
      );

      const root = document.querySelector(this.rootQuery);
      if (!root) {
        throw new Error(
          `Root element not found with selector: ${this.rootQuery}`,
        );
      }

      const element = this._componentInstance!.getElement();
      if (element) {
        root.append(element);
      }
    }

    this._componentInstance!.show();
  }
}
