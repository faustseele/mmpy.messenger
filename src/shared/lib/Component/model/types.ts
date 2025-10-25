import { DeepPartialExceptArray } from "../../../types/universal.ts";
import DOMService from "../../DOM/DOMService.ts";
import FragmentService from "../../Fragment/FragmentService.ts";
import { ComponentFactory } from "../../helpers/factory/types.ts";
import { BaseProps } from "./base.types.ts";
import { ChildGraph } from "./children.types.ts";
import Component from "./Component.ts";

/**
 * unique identifier of a Component
 */
export type ComponentId = string;

/**
 * minimal initial props for Component factory
 * default state; mutable data
 */
export type ComponentParams<P extends BaseProps> = {
  configs: P["configs"];
  attributes?: P["attributes"];
  on?: P["on"];
  children?: ChildGraph;
};

/* incoming updates/payload to patch Component */
export type ComponentPatch<P extends BaseProps> = DeepPartialExceptArray<
  ComponentParams<P>
>;

/**
 * entry at AppState Component graph
 * static metadata + mutable data + kids
 */
export type ComponentNode<
  P extends BaseProps,
  C extends Component<P> = Component<P>,
> = {
  readonly factory: ComponentFactory<P, C>;
  params: ComponentParams<P>;
  runtime?: { instance: C };
};

/* Component ctor. Props */
export type ComponentProps<P extends BaseProps, C extends Component<P>> = {
  deps: ComponentDeps<P>;
  node: ComponentNode<P, C>;
};

/* Dependency Injection services */
export type ComponentDeps<P extends BaseProps> = {
  domService: DOMService<P>;
  fragmentService: FragmentService<P["configs"]>;
};
