import { ComponentConfigs } from "../../core/Component/Component.d";

export interface IMessageData extends ComponentConfigs {
  __isOutgoing: boolean;
  __isIncoming: boolean;
  __isDateBubble: boolean;
  __text?: string;
  __image?: string; // This will be used in an `src` attribute
  __date: string;
  class?: string;
}
