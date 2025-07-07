import { TLink } from "../pages/pages.ts";
import {
  createAuthPage,
  createChatPage,
  createErrorPage,
  createProfilePage,
} from "./componentFactory.ts";

/* Defining routes and the Components they should render. */
const getPage = (path: TLink) => {
  switch (path) {
    case "/sign-up":
      return createAuthPage("/sign-up");
    case "/sign-in":
      return createAuthPage("/sign-in");
    case "/chats":
      return createChatPage();
    case "/profile":
      return createProfilePage();
    case "/404":
      return createErrorPage("404");
    case "/500":
      return createErrorPage("500");
    default:
      return createErrorPage("404");
  }
};

export function routeTo(path: TLink, event: Event | "initial route") {
  const app: HTMLElement | null = document.getElementById("app");
  if (!app) {
    console.error("App container not found!");
    return;
  }
  
  /* Either its 'initial load' or there is Event */
  if (!event && event !== "initial route") {
    console.error("Event is not defined, nor it's initial load");
    return;
  }

  /* Classical case: event is defined */
  if (event instanceof Event) {
    event.preventDefault();
  }

  /* Creating the new page Component */
  const newPage = getPage(path);

  /* Clearing previous page content + appending the new one */
  app.innerHTML = "";
  const pageElement = newPage.getElement();
  if (pageElement) app.appendChild(pageElement);

  /* Updating history & URL */
  // currentPage = newPage;
  window.history.pushState({ path }, "", path);
}
