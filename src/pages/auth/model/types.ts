import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import {
  ChildrenMap,
  ChildrenSchema,
} from "../../../shared/lib/Component/model/children.types.ts";
import Component from "../../../shared/lib/Component/model/Component.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";
import { HeadingProps } from "../../../shared/ui/Heading/types.ts";

export interface AuthProps extends BaseProps {
  configs: {
    tagName: Extract<TagNameType, "form">;
    type: "sign-up" | "sign-in";
  };
}

export interface AuthMap extends ChildrenMap {
  singles: {
    heading: {
      props: HeadingProps;
      component: Component<HeadingProps>;
    };
    /*     buttonFormSubmit: {
      props: ButtonProps;
      component: Button;
    };
    buttonReroute: {
      props: ButtonProps;
      component: Button;
    };
  };
  lists: {
    inputs: {
      props: InputProps;
      component: Input[];
    }; */
  };
}

export type AuthSchema = ChildrenSchema<AuthMap>;
