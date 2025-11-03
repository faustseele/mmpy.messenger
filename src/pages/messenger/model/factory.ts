import { connect } from "../../../app/providers/store/model/connect.ts";
import {
  ComponentDeps,
  ComponentNode,
  ComponentParams
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { PageFactory } from "../../../shared/lib/helpers/factory/types.ts";
import { PageNode } from "../../page/model/types.ts";
import { messengerPageParams } from "../config/params.ts";
import { MessengerPage } from "../ui/MessengerPage.ts";
import { mapMessengerState } from "./map.ts";
import { MessengerProps } from "./types.ts";

export function getMessengerPageNode(): PageNode<MessengerProps, MessengerPage> {
  return {
    params: messengerPageParams,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    factory: buildMessengerPage as any,
  };
}

const buildMessengerPage: PageFactory<MessengerProps, MessengerPage> = (
  params: ComponentParams<MessengerProps>,
): MessengerPage => {
  const deps: ComponentDeps<MessengerProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node: ComponentNode<MessengerProps, MessengerPage> = {
    params,
    factory: buildMessengerPage,
  };

  return new MessengerPage({
    deps,
    node,
  });
};

export const createMessengerPage = () =>
  connect(getMessengerPageNode(), mapMessengerState);
