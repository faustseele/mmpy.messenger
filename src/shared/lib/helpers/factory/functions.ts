import { BaseProps } from "../../Component/model/base.types.ts";
import {
  ChildGraph
} from "../../Component/model/children.types.ts";
import Component from "../../Component/model/Component.ts";

export function buildChildren(graph: ChildGraph): ChildGraph {
  if (!graph) throw new Error("children-graph is not defined");

  Object.keys(graph.edges).forEach((edge) => {
    if (Array.isArray(graph.edges[edge])) {
      for (const nodeId of graph.edges[edge]) {
        const childNode = graph.nodes[nodeId];
        childNode.runtime = { instance: childNode.factory(childNode.params) };
      }
    } else {
      const childNode = graph.nodes[edge];
      try {
        childNode.runtime = { instance: childNode.factory(childNode.params) };
      } catch (e) {
        console.error("Error in buildChildren", e);
      }
    }
  });

  return graph;
}

export function getInstances<
  P extends BaseProps,
  T extends Component<P>,
  K extends string = string,
>(graph: ChildGraph, edgesListKey: K): T[] {
  return (graph.edges[edgesListKey] as string[])
    .map((edge) => graph.nodes[edge]?.runtime?.instance)
    .filter((x): x is T => x != null);
}
