// --- General ---

/** Generic error response from the API */
export interface APIError {
  reason: string;
}

// --- Auth API ---

/* From POST /auth/signup */
export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

/* From POST /auth/signup */
export interface SignUpResponse {
  id: number;
}

/* From POST /auth/signin */
export interface SignInRequest {
  login: string;
  password: string;
}
// Note: Successful signin returns "OK" as a string, not JSON.

/* From GET /auth/user */
export interface UserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

// --- User API ---

/* From PUT /user/profile */
export type UserUpdateRequest = Partial<Omit<UserResponse, "id" | "avatar">>;

/* From PUT /user/password */
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

/* From POST /user/search */
export interface FindUserRequest {
  login: string;
}
/* Search response is an array of UserResponse: UserResponse[] */

// --- Chats API ---

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

/** A chat object from the list of chats */
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
/* The full response for GET /chats is an array: ChatResponse[] */

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
