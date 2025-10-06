import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import {
  ChildrenMap,
  ChildrenSchema,
} from "../../../shared/lib/Component/model/children.types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";
import { Button } from "../../../shared/ui/Button/Button.ts";
import { ButtonProps } from "../../../shared/ui/Button/types.ts";
import { Heading } from "../../../shared/ui/Heading/Heading.ts";
import { HeadingProps } from "../../../shared/ui/Heading/types.ts";
import { Input, InputProps } from "../../../shared/ui/Input/Input.ts";

export type AuthType = "sign-up" | "sign-in";

export interface AuthProps extends BaseProps {
  configs: {
    tagName: Extract<TagNameType, "form">;
    type: AuthType;
  };
}

export interface AuthMap extends ChildrenMap {
  singles: {
    heading: {
      props: HeadingProps;
      instanceType: Heading;
    };
    buttonFormSubmit: {
      props: ButtonProps;
      instanceType: Button;
    };
    buttonReroute: {
      props: ButtonProps;
      instanceType: Button;
    };
  };
  lists: {
    inputs: {
      props: InputProps;
      instanceType: Input[];
    };
  };
}

export type AuthSchema = ChildrenSchema<AuthMap>;
