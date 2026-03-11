import { SignInRequest } from "@shared/api/model/api.types.ts";

export const GUEST_CREDS: SignInRequest = {
  login: "whisper",
  password: "stealthyGuy123",
};

/**
 * Guest Credentials
 * Email: whisper@mmpy.chat.com
 * Login: whisper
 * First Name: Whisper
 * Second Name: Guest
 * Display Name: whisper
 * Password: stealthyGuy123
 * Phone: +79897675454
 */

export const GUEST_USER = {
  email: "whisper@mmpy.chat.com",
  login: "whisper",
  first_name: "Whisper",
  second_name: "Guest",
  display_name: "whisper",
  phone: "+79897675454",
}
