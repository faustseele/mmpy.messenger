import { BaseProps } from "../../lib/Component/model/base.types.ts";
import { RootTag } from "../../lib/DOM/types.ts";

export interface NavigationProps extends BaseProps {
  configs: {
    id: string;
    rootTag: Extract<RootTag, "nav">;
    classNames: string;
  };
}
