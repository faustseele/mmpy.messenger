import { BaseProps } from "../../Component/model/base.types.ts";
import {
  ChildGraph
} from "../../Component/model/children.types.ts";
import Component from "../../Component/model/Component.ts";

export function getInstances<
  P extends BaseProps,
  T extends Component<P>,
  K extends string = string,
>(graph: ChildGraph, edgesListKey: K): T[] {
  return (graph.edges[edgesListKey] as string[])
    .map((edge) => graph.nodes[edge]?.runtime?.instance)
    .filter((x): x is T => x != null);
}
