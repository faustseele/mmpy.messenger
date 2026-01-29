import { BaseProps } from "./base.types.ts";
import { ComponentId, ComponentNode } from "./types.ts";

/**
 * normalized state of Component nodes (children)
 * use type-assertion to access children instances
 */
export interface ChildGraph {
  nodes: ChildrenNodes;
  edges: ChildrenEdges;
}

export type ChildrenNodes<K extends string = ComponentId> = Record<
  K,
  ComponentNode<BaseProps>
>;

/* single -> single child; arr -> list of children */
export type ChildrenEdges = Record<ComponentId, ComponentId | ComponentId[]>;

export type ChildrenFlat = ComponentNode<BaseProps>[];
