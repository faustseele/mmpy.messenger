import { BaseProps } from "../../lib/Component/model/base.types.ts";
import { RootTag } from "../../lib/DOM/types.ts";

export interface SubheadingProps extends BaseProps {
  configs: {
    id: string;
    rootTag: Extract<RootTag, "h2">;
    classNames: string;
    text: string;
  };
}
