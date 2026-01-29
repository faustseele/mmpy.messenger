import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import {
  ChildrenNodes
} from "@shared/lib/Component/model/children.types.ts";
import { RootTag } from "@shared/lib/DOM/types.ts";
import { PageId } from "@pages/page/config/const.ts";

export type ErrorCodeType = "404" | "500";

export interface ErrorProps extends BaseProps {
  configs: {
    id: PageId.Error404 | PageId.Error500;
    rootTag: Extract<RootTag, "div">;
    classNames: string;
    code: ErrorCodeType;
  };
  on: {
    back: () => void;
  }
}

type ErrorMap = "heading" | "subheading" | "button_back";

export type ErrorNodes = ChildrenNodes<ErrorMap>;
