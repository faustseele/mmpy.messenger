import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import {
  ChildrenNodes
} from "../../../shared/lib/Component/model/children.types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";
import { PageId } from "../../page/config/const.ts";

export type ErrorCodeType = "404" | "500";

export interface ErrorProps extends BaseProps {
  configs: {
    id: PageId.Error;
    tagName: Extract<TagNameType, "div">;
    code: ErrorCodeType;
  };
}

type ErrorMap = "heading" | "subheading" | "button_back";

export type ErrorNodes = ChildrenNodes<ErrorMap>;
