import ChatService from "@entities/chat/model/ChatService.ts";

export const handleSendMessage = (text: string) => {
  ChatService.sendMessage(text);
};
