import { IComponentConfigs } from "../../framework/Component/Component.d";

export interface IMessageConfigs extends IComponentConfigs {
  __isOutgoing: boolean;
  __isIncoming: boolean;
  __isDateBubble: boolean;
  __text?: string;
  /* This will be used in an `src` attribute */
  __image?: string;
  __date: string;
  class?: string;
}
