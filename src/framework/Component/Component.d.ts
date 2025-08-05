/* eslint-disable no-unused-vars */
/* ...params are used */
import { IPageConfigs } from "../../pages/page.d";
import { TagNames } from "../../services/render/DOM/DOM.d";
import FragmentService from "../../services/render/Fragment/FragmentService.ts";
import Component from "./Component.ts";

export type ConcreteComponent = Component<
  IComponentConfigs,
  IComponentAttributes,
  IComponentEvents,
  IChildrenData
>;

/* The shape of the props-object that every Component receives. */
export interface ComponentProps<
  C extends IComponentConfigs,
  A extends IComponentAttributes,
  E extends IComponentEvents,
  CD extends IChildrenData,
> {
  deps: IComponentDeps;
  data: IComponentData<C, A, E, CD, ConcreteComponent>;
}

/* Dependency Injection services */
export interface IComponentDeps {
  domService: DOMService;
  fragmentService: FragmentService;
}

/* Data for a concrete Component instance */
export interface IComponentData<
  C extends IComponentConfigs,
  A extends IComponentAttributes,
  E extends IComponentEvents,
  CD extends IChildrenData,
  ConcreteComponent extends Component<C, A, E, CD>,
> {
  /* Non-attributes configurations, {{}} */
  configs: C;
  componentFactory: IComponentFactory<C, A, E, ConcreteComponent>;
  attributes?: A;
  events?: E;
  childrenData?: CD;
  childrenMap?: IChildrenMap;
}

/* Configuration data for a concrete Component instance */
export interface IComponentConfigs {
  /* slotName resembles the hbs {{{html-escaping expressions}}} */
  slotName: string;
  tagName: TagNames;
  type?: string;
  pageConfigs?: IPageConfigs;
}

/* Attributes for root tag of a Component */
export interface IComponentAttributes {
  _class?: string;
  type?: string;
  style?: string;
}

/* Event handlers for a concrete Component instance */
export type IComponentEvents = Record<string, (event: Event) => void>;

/**
 * No extenstions here, because IChildrenData is general abstract Component
 * For conctrete Components types, look at each childrenMap interfaces in the pages
 */

export type IChildrenData = Record<
  string,
  | IComponentData<
      IComponentConfigs,
      IComponentAttributes,
      IComponentEvents,
      ConcreteComponent
    >
  | IChildrenDataList
>;

export interface IChildrenDataList {
  slotName: string;
  list: IComponentData<C, A, E, ConcreteComponent>[];
  componentFactory: IComponentFactory<C, A, E, ConcreteComponent>;
}

/**
 * It's a proptery/state of the Component.
 */
export type IChildrenMap = Record<string, ConcreteComponent | IChildrenList>;

export interface IChildrenList {
  slotName: string;
  list: ConcreteComponent[];
  componentFactory: IComponentFactory<
    IComponentConfigs,
    IComponentAttributes,
    IComponentEvents,
    ConcreteComponent
  >;
}

export type IComponentFactory<
  C extends IComponentConfigs,
  A extends IComponentAttributes,
  E extends IComponentEvents,
  ConcreteComponent extends Component<C, A, E>,
> = (data: IComponentData<C, A, E, ConcreteComponent>) => ConcreteComponent;
