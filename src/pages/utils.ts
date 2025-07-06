import { getAuthPage } from "./auth/auth.tmpl";
import { getChatPage } from "./chat/chat.tmpl";
import { getProfilePage } from "./profile/profile.tmpl";
import { getErrorPage } from "./errors/errors.tmpl";
import { guardLink, Link } from "./pages.d";

export function getPage(link: Link) {
  if (!guardLink(link)) {
    console.error("Bad link:", link);
    return getErrorPage("/404");
  }

  switch (link) {
    case "/sign-up":
      return getAuthPage();
    case "/sign-in":
      return getAuthPage();
    case "/chats":
      return getChatPage();
    case "/profile":
      return getProfilePage();
    case "/404":
      return getErrorPage(link);
    case "/500":
      return getErrorPage(link);
    default:
      console.error("Bad link:", link);
      return getErrorPage("/404");
  }
}
