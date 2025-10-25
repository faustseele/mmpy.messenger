/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseProps } from "../../../../shared/lib/Component/model/base.types.ts";
import {
  ComponentNode,
  ComponentPatch,
} from "../../../../shared/lib/Component/model/types.ts";
import { DeepPartialExceptArray } from "../../../../shared/types/universal.ts";
import {
  deepEqualExceptChildren,
  edgesLenEqual,
  ensureInstance,
  reconcileChildrenByLength,
} from "./compare.ts";

export function applyNodePatch<P extends BaseProps>(
  node: ComponentNode<P>,
  patch: ComponentPatch<P>,
) {
  const prevParams = node.params;
  const prevEdges = prevParams.children?.edges ?? {};

  /* arrays replace, null deletes (your existing fn) */
  const nextParams = applyPatch(prevParams, patch);

  // 1) if anything except children changed → push to instance
  if (!deepEqualExceptChildren(prevParams, nextParams)) {
    ensureInstance(node);
    node.runtime!.instance.setProps?.(nextParams);
    node.params = nextParams;
  } else {
    // still persist the params (idempotent if same object)
    node.params = nextParams;
  }

  // 2) cheap children check → by slot count + slot list lengths
  const nextEdges = nextParams.children?.edges ?? {};
  if (!edgesLenEqual(prevEdges, nextEdges)) {
    reconcileChildrenByLength(node, prevEdges, nextEdges);
  }
}

function applyPatch<T>(target: T, patch: DeepPartialExceptArray<T>): T {
  if (patch === null) return target; // top-level null not used here
  if (Array.isArray(patch)) return patch as any; // replace whole array
  if (typeof patch !== "object" || patch === undefined) return target;

  const out: any = Array.isArray(target)
    ? [...(target as any)]
    : { ...(target as any) };

  for (const k in patch as any) {
    const pv = (patch as any)[k];
    const tv = (target as any)[k];

    if (pv === null) {
      delete out[k]; // <-- explicit removal
    } else if (Array.isArray(pv)) {
      out[k] = pv; // replace array
    } else if (
      typeof pv === "object" &&
      pv !== undefined &&
      typeof tv === "object" &&
      tv !== null &&
      !Array.isArray(tv)
    ) {
      out[k] = applyPatch(tv, pv); // deep merge objects
    } else if (pv !== undefined) {
      out[k] = pv; // set scalars/functions
    }
    // pv === undefined → no-op (leave as is)
  }
  return out;
}
