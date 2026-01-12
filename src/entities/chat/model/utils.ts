import { ChatId } from "@/shared/api/model/api.types.ts";
import ChatService from "./ChatService.ts";

export const isChatNotes = async (id: ChatId): Promise<boolean> => {
  const resChatParticipants = await ChatService.getUsers(id);

  if (!resChatParticipants.ok) return false;

  const userOnly = resChatParticipants.data!.length < 2;

  if (userOnly) {
    return true;
  } else {
    return false;
  }
};
