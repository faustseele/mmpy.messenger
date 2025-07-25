import { Routes } from "./routes.d";
import {
  createAuthPage,
  createChatPage,
  createProfilePage,
  createErrorPage,
} from "../../utils/componentFactory.ts";
import Component from "../Component/Component.ts";

export default class Router {
  private currentPage: Component | null = null;

  constructor() {}

  /* Defining routes and the Components they should render. */
  private _getPage(path: Routes) {
    switch (path) {
      case "/sign-up":
        return createAuthPage(path, this);
      case "/sign-in":
        return createAuthPage(path, this);
      case "/chats":
        return createChatPage(this);
      case "/profile":
        return createProfilePage(this);
      case "/404":
        return createErrorPage(path, this);
      case "/500":
        return createErrorPage(path, this);
      default:
        return createErrorPage(Routes.NotFound, this);
    }
  }

  public routeTo(path: Routes, event: Event | "initial route") {
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

    /* Unmounting previous Page-Component */
    if (this.currentPage) this.currentPage.componentDidUnmount();

    /* Creating the new page Component */
    this.currentPage = this._getPage(path);

    /* Clearing previous page content + appending the new one */
    app.textContent = "";
    const pageElement = this.currentPage.getElement();
    if (pageElement) app.appendChild(pageElement);

    /* Updating history & URL */
    window.history.pushState({ path }, "", path);
  }
}
