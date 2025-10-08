/* eslint-disable no-unused-vars */
/* ...params are used */

import { AppState } from "../../../../app/providers/store/Store.ts";
import { PropsWithState } from "../../../../app/providers/store/types.ts";
import { PageConfigs } from "../../../../pages/page/model/types.ts";
import DOMService from "../../DOM/DOMService.ts";
import { TagNameType } from "../../DOM/types.ts";
import FragmentService from "../../Fragment/FragmentService.ts";
import { BaseProps } from "./base.types.ts";
import {
  ChildrenInstances,
  ChildrenMap,
  ChildrenSchema,
} from "./children.types.ts";

export interface ComponentProps<
  TProps extends BaseProps,
  TMap extends ChildrenMap = ChildrenMap,
  TSchema extends ChildrenSchema<TMap> = ChildrenSchema<TMap>,
> {
  deps: ComponentDeps;
  data: ComponentData<TProps, TMap, TSchema>;
}

export type SetPropsPayload<
  StateSlice extends AppState,
  TProps extends BaseProps,
  TMap extends ChildrenMap = ChildrenMap,
  TSchema extends ChildrenSchema<TMap> = ChildrenSchema<TMap>,
> = Partial<Omit<PropsWithState<StateSlice, TProps>, "data">> & {
  data?: Partial<ComponentData<TProps, TMap, TSchema>>;
};

/* Dependency Injection services */
export interface ComponentDeps {
  domService: DOMService<ComponentAttributes, ComponentEvents>;
  fragmentService: FragmentService<ComponentConfigs>;
}

/**
 * Extends the ComponentInit payload to a full
 * Data-Structure of a Component instance
 */
export type ComponentData<
  TProps extends BaseProps,
  /* Def for childless components */
  TMap extends ChildrenMap = ChildrenMap,
  TSchema extends ChildrenSchema<TMap> = ChildrenSchema<TMap>,
> = ComponentInit<TProps> & Children<TMap, TSchema>;

/* The minimal payload for every Component initialization */
export interface ComponentInit<TProps extends BaseProps> {
  configs: TProps["configs"];
  attributes?: TProps["attributes"];
  events?: TProps["events"];
}

export interface Children<
  TMap extends ChildrenMap,
  TSchema extends ChildrenSchema<TMap>,
> {
  childrenSchema?: TSchema;
  childrenInstances?: ChildrenInstances<TMap, TSchema>;
}

/* Configuration data for a concrete Component instance */
export interface ComponentConfigs {
  tagName: TagNameType;
  type?: string;
  pageConfigs?: PageConfigs;
}

/* Attributes for root tag of a Component */
export interface ComponentAttributes {
  className?: string;
  type?: string;
  style?: string;
  for?: string;
}

/* Event handlers for a concrete Component instance */
export type ComponentEvents = Record<string, (event: Event) => void>;

export type ComponentEventBusEvents =
  | "init" // Component initialized
  | "flow:component-did-mount" // Component added to DOM
  | "flow:render" // Component rendered
  | "flow:component-did-update" // Component updated
  | "flow:component-did-unmount"; // Component unmounted
