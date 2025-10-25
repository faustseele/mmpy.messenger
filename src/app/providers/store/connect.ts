import { PageNode } from "../../../pages/page/model/types.ts";
import { Page } from "../../../pages/page/ui/Page.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { getProjection } from "./lib/patch.ts";
import { isEqual, merge } from "./lib/utils.ts";
import Store from "./Store.ts";
import { MapStateToProps } from "./types.ts";

/* bridges Store <-> Page blueprint */

export function connect<P extends BaseProps, C extends Page<P>>(
  blueprint: PageNode<P, C>,
  mapStateToProps: MapStateToProps<P>,
): C {
  /* on initial Page connection */
  const id = blueprint.params.configs.id;
  const pageIsNew = !Store.getState().pageNodes[id];
  let connectedNode = Store.getState().pageNodes[id];
  if (pageIsNew) {
    /* creates instance */
    blueprint.runtime = { instance: blueprint.factory(blueprint.params) };
    /* appends new blueprint to the Store */
    Store.set("pageNodes", {
      ...Store.getState().pageNodes,
      [id]: blueprint,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    connectedNode = blueprint as any;
  }

  function handlePatch() {
    const state = Store.getState();
    const patch = mapStateToProps(state);
    /* projection -> only patch-realted props from connectedNode.params */
    const projection = getProjection(connectedNode.params, patch);

    if (!isEqual(projection, patch)) {
      // console.log(projection?.configs?.profileName, patch?.configs?.profileName);
      const patchedParams = merge(connectedNode.params, patch);
      connectedNode.runtime?.instance.setProps(patchedParams);
    }
  }

  /* initial patch on connect */
  handlePatch();

  /* on Store changes */
  const onStoreUpdated = () => {
    handlePatch();
  };
  Store.on("updated", onStoreUpdated);

  /* cleans up subscription on page unmount */
  connectedNode.runtime?.instance.bus.on("flow:component-did-unmount", () => {
    Store.off("updated", onStoreUpdated);
  });

  if (!connectedNode.runtime) {
    console.error(connectedNode, blueprint);
    throw new Error("connect: connectedNode.runtime is undefined");
  }

  return connectedNode.runtime!.instance as C;
}
