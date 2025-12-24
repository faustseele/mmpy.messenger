import { CreateChatResponse } from "@/shared/api/model/types.ts";
import ChatService from "./ChatService.ts";

export const handleCreateChat = async (
  title: string,
): Promise<CreateChatResponse | undefined> => {
  const res = await ChatService.createChat(title);

  if (res?.id) {
    const resChats = await ChatService.fetchChats();
    await ChatService.selectChat(res.id);

    console.log(`chat ${title} create success !:`, res, resChats);
    return res;
  } else {
    console.error("Chat create failed");
    return;
  }
};

export const handleSelectChat = async (id: number) => {
  await ChatService.selectChat(id);
};

export const handleDeleteChat = async (id: number) => {
  await ChatService.deleteChat(id);
};
