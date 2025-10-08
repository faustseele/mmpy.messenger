/* From POST /chats */
export interface CreateChatRequest {
  title: string;
}

/* From POST /chats */
export interface CreateChatResponse {
  id: number;
}

/* From DELETE /chats */
export interface DeleteChatRequest {
  chatId: number;
}

/** User info as it appears in a chat message */
interface LastMessageUser {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}

/** A chat object from the list of chats
  * The full response for GET /chats is an array: ChatResponse[] 
  */
export interface ChatResponse {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: {
    user: LastMessageUser;
    time: string; // ISO-8601 timestamp
    content: string;
  } | null;
}

/* From PUT /chats/users and DELETE /chats/users */
export interface ChatUsersRequest {
  users: number[];
  chatId: number;
}

/* From GET /chats/:id/users */
export interface ChatUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string | null;
  role: "admin" | "regular";
}

/* From POST /chats/token/:id */
export interface ChatTokenResponse {
  token: string;
}
