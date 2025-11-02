import Store from "../../../app/providers/store/Store.ts";
import { ChatId } from "../../../shared/api/model/types.ts";
import ChatService from "./ChatService.ts";

export const isChatNotes = async (id: ChatId | null): Promise<boolean> => {
  const userId = Store.getState().api.auth.user?.id;
  if (!userId || !id) {
    console.error("No user found");
    return false;
  }

  const usersInChat = (await ChatService.getUsers(id)).filter(
    (user) => user.id !== userId,
  );

  if (usersInChat.length === 0) {
    return true;
  } else {
    return false;
  }
};
