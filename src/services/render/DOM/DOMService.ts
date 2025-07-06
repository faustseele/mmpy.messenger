import { v4 as makeUUID } from "uuid";
import type {
  ComponentConfigs,
  ComponentEvents,
} from "../../../core/Component/Component.d";
import { tagNames } from "./DOM.d";

/**
 * @DOMService ­– Owns the DOM-related logic.
 * * Creates DOM-Elements
 * * Re-renders the DOM-Elements
 * * Adds/removes event listeners
 * * Shares Dom-Elements
 */

export default class DOMService {
  public readonly id: string = makeUUID();
  public readonly tagName: tagNames;

  private _configs: ComponentConfigs | null = null;

  public element: HTMLElement | null = null;

  constructor(tagName: tagNames, configs: ComponentConfigs) {
    this.tagName = tagName;
    this._configs = configs;
  }

  public createElement() {
    if (!this._configs) {
      console.error("Cannot create Element: configs are null.");
      return;
    }

    /* Creating an empty Element
      e.g. 'div' -> rendered HTMLElement */
    const newElement = document.createElement(this.tagName);

    /* Handling Elements attributes */
    newElement.setAttribute("data-id", this.id);
    Object.entries(this._configs).forEach(([key, value]) => {
      /* 'childrenMarkup' is reserved for Handlebars */
      if (key.startsWith("__")) return;

      newElement.setAttribute(key, String(value));
    });

    this.element = newElement;
  }

  public insertFragmentIntoElement(fragment: DocumentFragment): void {
    if (!this.element) {
      console.error("Cannot render: DOMService element is null.");
      return;
    }

    this.element.innerHTML = "";

    /* Child nodes of the DocumentFragment
      are moved into the Element */
    this.element.appendChild(fragment);
  }

  public addListeners(events: ComponentEvents): void {
    const element = this.getElement();
    if (!element) {
      console.error("Element is not defined");
      return;
    }

    Object.keys(events).forEach((eventName) => {
      element!.addEventListener(eventName, events[eventName]);
    });
  }

  public removeListeners(events: ComponentEvents): void {
    const element = this.getElement();
    if (!element) return;

    Object.keys(events).forEach((eventName) => {
      element.removeEventListener(eventName, events[eventName]);
    });
  }

  public getElement(): HTMLElement | null {
    if (!this.element) {
      console.error("Element is not defined");
      return null;
    }
    return this.element;
  }
}
