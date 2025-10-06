import { ComponentFactory } from "../../helpers/factory/types.ts";
import { BaseProps } from "./base.types.ts";
import Component from "./Component.ts";
import { ComponentInit } from "./types.ts";

export type ChildrenMap = {
  singles: {
    [key: string]: {
      props: BaseProps;
      instanceType: Component<BaseProps>;
    };
  };
  lists: {
    [key: string]: {
      props: BaseProps;
      instanceType: Component<BaseProps>[];
    };
  };
};

/**
 * Contract that folds children-blueprints into
 * a parent-level registry (Page per se)
 */
export type ChildrenSchema<Map extends ChildrenMap = ChildrenMap> = {
  singles: {
    [K in keyof Map["singles"]]: ChildBlueprint<
      Map["singles"][K]["props"],
      Map["singles"][K]["instanceType"]
    >;
  };
  lists: {
    [K in keyof Map["lists"]]: ChildrenBlueprint<
      Map["lists"][K]["props"],
      Map["lists"][K]["instanceType"][0]
    >;
  };
};

/**
 * A Child's metadata
 * ComponentInit (min payload) + Factory
 */
export type ChildBlueprint<
  TProps extends BaseProps,
  TComponent extends Component<TProps>,
> = {
  init: ComponentInit<TProps>;
  factory: ComponentFactory<TProps, TComponent>;
  /* Instances collection of a Component */
  instanceType: TComponent;
};
export type ChildrenBlueprint<
  TProps extends BaseProps,
  TComponent extends Component<TProps>,
> = {
  init: ComponentInit<TProps>[];
  factory: ComponentFactory<TProps, TComponent>;
  /* Instances collection of a Component */
  instanceType: TComponent[];
};

export type ChildrenInstances<
  Map extends ChildrenMap = ChildrenMap,
  TSchema extends ChildrenSchema<Map> = ChildrenSchema<Map>,
> = {
  singles: {
    [K in keyof TSchema["singles"]]: TSchema["singles"][K]["instanceType"];
  };
  lists: {
    [K in keyof TSchema["lists"]]: TSchema["lists"][K]["instanceType"];
  };
};

export type CombinedChildrenInstances<
  TProps extends BaseProps,
  TMap extends ChildrenMap,
> = {
  [key: string]: Component<TProps, TMap> | Component<TProps, TMap>[];
};
