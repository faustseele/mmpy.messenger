import Router from "@/app/providers/router/Router.ts";
import ChatService from "@/entities/chat/model/ChatService.ts";
import UserService from "@/entities/user/model/UserService.ts";
import { ChatId } from "@/shared/api/model/types.ts";
import { RouteLink } from "@/shared/types/universal.ts";

export const handleAddUsers = async (id: ChatId, users: number[]) => {
  await ChatService.addUsers(id, users);
};

export const handleDeleteChat = async (id: ChatId) => {
  await ChatService.deleteChat(id);
};

export const handleCloseChat = () => {
  ChatService.deselectChat();
};

export const handleUpdateChatAvatar = async (id: ChatId, avatar: File) => {
  ChatService.updateChatAvatar(id, avatar);
};

export const handleFindUser = async (login: string) => {
  return await UserService.findByLogin(login);
};

export const handleGoToSettings = () => {
  Router.go(RouteLink.Settings);
};

