import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import {
  Children,
  ChildrenData,
} from "../../../shared/lib/Component/model/children.types.ts";
import { ComponentConfigs } from "../../../shared/lib/Component/model/types.ts";

export type ErrorCodeType = "404" | "500";

export type ErrorPageChildrenKeys =
  | "heading_profile"
  | "heading_back"
  | "inputs"
  | "button_editInfo"
  | "button_editPassword"
  | "button_logout";

export interface ErrorPageProps extends BaseProps {
  configs: ErrorPageConfigs;
  childrenData?: ChildrenData<ErrorPageChildrenKeys>;
  children?: Children<ErrorPageChildrenKeys>;
}

export interface ErrorPageConfigs extends ComponentConfigs {
  code: ErrorCodeType;
}
