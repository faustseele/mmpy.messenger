import { BaseProps } from "../../lib/Component/model/base.types.ts";
import { TagNameType } from "../../lib/DOM/types.ts";

export interface SubheadingProps extends BaseProps {
  configs: {
    id: string;
    tagName: Extract<TagNameType, "h2">;
    text: string;
  };
}
