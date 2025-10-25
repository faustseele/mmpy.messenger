import { ChatResponse } from "../../../entities/chat/model/types.ts";
import { UserResponse } from "../../../features/authenticate/model/types.ts";

/** Generic error response from the API */
export interface APIError {
  reason: string;
}

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
