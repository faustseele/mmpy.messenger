import { BaseProps } from "@shared/lib/Component/model/base.types.ts";
import { ChildrenNodes } from "@shared/lib/Component/model/children.types.ts";
import { TagNameType } from "@shared/lib/DOM/types.ts";
import { PageId } from "@pages/page/config/const.ts";

export type AuthType = "sign-up" | "sign-in";

export interface AuthProps extends BaseProps {
  configs: {
    id: PageId.SignIn | PageId.SignUp;
    tagName: Extract<TagNameType, "form">;
    type: AuthType;
  };
}

type AuthMap = "heading" | "buttonFormSubmit" | "buttonReroute" | "inputs";

export type AuthNodes = ChildrenNodes<AuthMap>;
