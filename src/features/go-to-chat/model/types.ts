import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ComponentConfigs } from "../../../shared/lib/Component/model/types.ts";
import { TagNameType } from "../../../shared/lib/DOM/types.ts";

export interface GoToChatProps extends BaseProps {
  configs: GoToChatConfigs;
  attributes?: BaseProps["attributes"];
}

export interface GoToChatConfigs extends ComponentConfigs {
  tagName: Extract<TagNameType, "article" | "li">;
  title: string;
  contentText: string;
  date: string;
  unreadCount: string;
  avatar: string;
}
