import { PageNode } from "../../../pages/page/model/types.ts";
import { Page } from "../../../pages/page/ui/Page.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { isEqual, merge } from "./lib/utils.ts";
import Store from "./Store.ts";
import { MapStateToProps } from "./types.ts";

/**
 * bridges Store <-> Page blueprint
 */

export function connect<P extends BaseProps, C extends Page<P>>(
  initNode: PageNode<P, C>,
  mapStateToProps: MapStateToProps<P>,
): C {
  /* on initial Page connection */
  const id = initNode.params.configs.id;
  const pageIsNew = !Store.getState().pageNodes[id];
  let resNode = Store.getState().pageNodes[id];
  if (pageIsNew) {
    /* creates instance */
    initNode.runtime = { instance: initNode.factory(initNode.params) };
    /* appends new initNode to the Store */
    Store.set("pageNodes", {
      ...Store.getState().pageNodes,
      [id]: initNode,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resNode = initNode as any;
  }

  function handlePatch() {
    const patch = mapStateToProps(Store.getState());
    const patchedParams = merge(initNode.params, patch);

    if (!isEqual(initNode.params, patchedParams)) {
      resNode.runtime?.instance.setProps(patchedParams);
    }
  }

  handlePatch();

  /* on Store changes */
  const unsubscribe = () =>
    Store.on("updated", () => {
      handlePatch();
    });

  resNode.runtime?.instance.bus.on("flow:component-did-unmount", unsubscribe);

  if (!resNode.runtime) {
    console.error(resNode, initNode);
    throw new Error("connect: resNode.runtime is undefined");
  }

  return resNode.runtime!.instance as C;
}
