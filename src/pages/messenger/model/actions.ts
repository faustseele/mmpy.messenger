import { API_URL_RESOURCES } from "@/shared/config/urls.ts";
import { urlToFile } from "@/shared/lib/helpers/file.ts";
import Router from "@app/providers/router/Router.ts";
import UserService from "@entities/user/model/UserService.ts";
import { RouteLink } from "@shared/types/universal.ts";
import { MessengerOn } from "./types.ts";
import { randomNoteLabel } from "./utils.ts";

export const handleFindUser = async (login: string) => {
  return await UserService.findByLogin(login);
};

export const handleGoToSettings = () => {
  Router.go(RouteLink.Settings);
};

export const handleAddChat = async (on: MessengerOn) => {
  const explanation = `Логин пользователя:\n\n Доступные сейчас: \n• emil\n• LevTolstoy\n• yandex\n• LeUser\n• mishima\n• tolkien\n• baudrillard\n• foucault\n• shakespear`;

  const input = window.prompt(explanation, "");
  if (input === null) return;

  const login = input.trim();
  if (!login) return;

  const resUser = await on.findUser(login);
  if (!resUser.ok) return;
  const user = resUser.data!;

  const newChatRes = await on.addChatWithUser(
    user.first_name,
    user.second_name,
  );
  if (!newChatRes.ok) return;
  const chatId = newChatRes.data!.id;

  await on.addUsers(chatId, [user.id]);

  if (user.avatar) {
    const avatar = await urlToFile(`${API_URL_RESOURCES}${user.avatar}`);
    on.updateChatAvatar(chatId, avatar);
  }

  console.log(`User ${user.login} (id=${user.id}) added to chat`, chatId);
};

export const handleAddNotes = async (on: MessengerOn) => {
  const chatName = randomNoteLabel();
  const input = window.prompt("Как назовём заметки?", chatName);
  if (input === null) return;

  const title = input.trim();
  if (!title) return;

  on?.addNotes?.(title);
};

export const handleDeleteChat = async (
  e: Event,
  on: MessengerOn,
  title: string,
  chatId: number,
) => {
  e.preventDefault();

  const confirm = window.confirm(`Вы уверены, что хотите удалить ${title}?`);
  if (!confirm) return;

  const id = chatId;

  if (id) on?.deleteChat?.(id);
};
