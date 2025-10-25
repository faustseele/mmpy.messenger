import { ChatResponse } from "../../../entities/chat/model/types.ts";
import { UserResponse } from "../../../features/authenticate/model/types.ts";
import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ComponentPatch } from "../../../shared/lib/Component/model/types.ts";
import { AppState } from "./Store.ts";

export type StoreEventBusEvents = "updated";

export type MapStateToProps<P extends BaseProps> = (state: AppState) => ComponentPatch<P>;

export interface APIState {
  auth: {
    user: UserResponse | null;
  };
  chats: {
    activeId: number | null;
    currentChat: ChatResponse | null;
    list: ChatResponse[] | null;
  };
}
