import { APIState } from "./store.types.ts";

export const apiInitialState: APIState = {
  auth: {
    user: null,
  },
  chats: {
    activeId: null,
    currentChat: null,
    list: null,
  },
};
