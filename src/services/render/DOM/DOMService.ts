import { v4 as makeUUID } from "uuid";
import type {
  IComponentAttributes,
  IComponentEvents,
} from "../../../framework/Component/Component.d";
import { TagNames } from "./DOM.d";

/**
 * @DOMService ­– Owns the DOM-related logic.
 * * Creates DOM-Elements
 * * Re-renders the DOM-Elements
 * * Adds/removes event listeners
 * * Shares Dom-Elements
 */

export default class DOMService<
  A extends IComponentAttributes,
  E extends IComponentEvents | undefined,
> {
  private readonly _tagName: TagNames;
  private _attributes?: A = undefined;
  private _element: HTMLElement | null = null;

  public readonly id: string = makeUUID();
  public get element(): HTMLElement | null {
    return this._element;
  }

  constructor(tagName: TagNames, attributes?: A) {
    this._tagName = tagName;
    this._attributes = attributes;
  }

  public createElement() {
    /* Creating an empty Element
      e.g. 'div' -> rendered HTMLElement */
    this._element = document.createElement(this._tagName);

    /* In case attributes are passed */
    if (this._attributes) {
      this._element = this._addAttributes(this._element, this._attributes);
    }
  }

  private _addAttributes(
    element: HTMLElement,
    attributes: IComponentAttributes,
  ): HTMLElement {
    element.setAttribute("data-id", this.id);

    /* Handling Elements attributes */
    Object.entries(attributes).forEach(([key, value]) => {
      if (!value) return;

      /* Handling special 'className' field */
      if (key === "className") {
        element.classList.add(...value.split(" "));
        return;
      }

      element.setAttribute(key, String(value));
    });

    return element;
  }

  public insertFragmentIntoElement(fragment: DocumentFragment): void {
    if (!this._element) {
      console.error("Cannot render: DOMService element is null.");
      return;
    }

    this._element.textContent = "";

    /* Child nodes of the DocumentFragment
      are moved into the Element */
    this._element.appendChild(fragment);
  }

  public addListeners(events?: E): void {
    if (!this._element || !events) return;

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  public removeListeners(events?: E): void {
    if (!this._element || !events) return;

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }
}
