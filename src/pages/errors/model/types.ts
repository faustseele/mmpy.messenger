import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ChildrenMap, ChildrenSchema } from "../../../shared/lib/Component/model/children.types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { ButtonProps } from "../../../shared/ui/Button/types.ts";
import { Heading } from "../../../shared/ui/Heading/Heading.ts";
import { HeadingProps } from "../../../shared/ui/Heading/types.ts";
import { Subheading } from "../../../shared/ui/Subheading/Subheading.ts";
import { SubheadingProps } from "../../../shared/ui/Subheading/types.ts";

export type ErrorCodeType = "404" | "500";

export interface ErrorProps extends BaseProps {
  configs: {
    tagName: Extract<TagNameType, "div">;
    code: ErrorCodeType;
  };
}

export interface ErrorMap extends ChildrenMap {
  singles: {
    heading: {
      props: HeadingProps;
      instanceType: Heading;
    };
    subheading: {
      props: SubheadingProps;
      instanceType: Subheading;
    };
    button_back: {
      props: ButtonProps;
      instanceType: Button;
    };
  };
}

export type ErrorSchema = ChildrenSchema<ErrorMap>;
