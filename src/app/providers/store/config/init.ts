import { APIState } from "../model/types.ts";

export const apiInitialState: APIState = {
  auth: {
    user: null,
  },
  chats: {
    activeId: null,
    currentChat: null,
    list: null,
    messagesByChatId: {},
    wsStatus: "idle",
  },
};
