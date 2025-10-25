import { APIState } from "../../../shared/api/model/types.ts";

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
