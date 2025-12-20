import { CreateChatResponse } from "@/shared/api/model/types.ts";
import ChatService from "./ChatService.ts";

export const createChat = async (
  title: string,
): Promise<CreateChatResponse | undefined> => {
  const res = await ChatService.createChat(title);

  if (res?.id) {
    await ChatService.fetchChats();
    selectChat(res.id);
    return res;
  } else {
    console.error("Chat create failed");
    return;
  }
};

export const selectChat = async (id: number) => {
  await ChatService.selectChat(id);
};

export const deleteChat = async (id: number) => {
  await ChatService.deleteChat(id);
};
