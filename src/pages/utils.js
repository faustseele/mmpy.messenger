import { getAuthPage } from "./auth/auth.tmpl.js";
import { getChatPage } from "./chat/chat.tmpl.js";
import { getProfilePage } from "./profile/profile.tmpl.js";
import { getErrorPage } from "./errors/errors.tmpl.js";
import { pageAddresses } from "./data.js";

export function getPage(link) {
  if (!pageAddresses.includes(link)) {
    console.error("Bad link:", link);
    return getErrorPage("/404");
  }

  switch (link) {
    case "/sign-up":
      return getAuthPage(link);
      break;
    case "/sign-in":
      return getAuthPage(link);
      break;
    case "/chats":
      return getChatPage();
      break;
    case "/profile":
      return getProfilePage();
      break;
    case "/404":
      return getErrorPage(link);
      break;
    case "/500":
      return getErrorPage(link);
      break;
    default:
      return getErrorPage("/404");
      console.error("Bad link:", link);
      break;

  }
}
