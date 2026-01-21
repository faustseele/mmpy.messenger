import { PageId } from "@pages/page/config/const.ts";
import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
import { RootTag } from "@shared/lib/DOM/types.ts";
import FormValidator from "@shared/lib/validation/FormValidator.ts";

export type AuthType = "sign-up" | "sign-in";

export interface AuthProps extends BaseProps {
  configs: {
    id: PageId.SignIn | PageId.SignUp;
    rootTag: Extract<RootTag, "form">;
    classNames: string;
    type: AuthType;
  };
  on: {
    submit?: (e: Event, validator: FormValidator, type: AuthType) => void;
  };
}

type AuthMap = "heading" | "buttonFormSubmit" | "buttonReroute" | "inputs";

export type AuthNodes = ChildrenNodes<AuthMap>;
