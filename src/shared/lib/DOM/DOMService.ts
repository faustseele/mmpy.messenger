import { BaseProps } from "../Component/model/base.types.ts";
import { ComponentId } from "../Component/model/types.ts";
import { lgg } from "../logs/Logger.ts";
import { TagNameType } from "./types.ts";

/**
 * @DOMService ­– owns the DOM-related logic
 * * creates DOM-Elements
 * * re-renders the DOM-Elements
 * * adds/removes event listeners
 * * shares Dom-Elements
 */

export default class DOMService<P extends BaseProps> {
  private readonly _tagName: P["configs"]["tagName"];
  private _attrs?: P["attributes"] = undefined;
  private _element: HTMLElement | null = null;
  private _id: ComponentId;

  public get element(): HTMLElement | null {
    return this._element;
  }

  constructor(id: ComponentId, tagName: TagNameType, attrs?: P["attributes"]) {
    this._id = id;
    this._tagName = tagName;
    this._attrs = attrs;
  }

  public createElement() {
    if (!this._element) {
      /* creates an empty tag-element */
      this._element = document.createElement(this._tagName);
      if (this._attrs) this._addAttributes(this._element, this._attrs);
    }
  }

  private _addAttributes(
    element: HTMLElement,
    attrs?: P["attributes"],
  ): HTMLElement {
    if (!attrs) return element;

    element.setAttribute("data-id", this._id);

    /* Handling Elements attrs */
    Object.entries(attrs).forEach(([key, value]) => {
      if (!value || typeof value !== "string") return;

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
      lgg.error("Cannot render: DOMService element is null.");
      return;
    }

    this._element.textContent = "";

    /* Child nodes of the DocumentFragment
      are moved into the Element */
    this._element.appendChild(fragment);
  }

  public addListeners(on?: P["on"]): void {
    if (!this._element || !on) return;

    Object.keys(on).forEach((event) => {
      this._element!.addEventListener(event, on[event]);
    });
  }

  public removeListeners(patch?: P["on"]): void {
    if (!this._element || !patch) return;

    Object.keys(patch).forEach((event) => {
      this._element!.removeEventListener(event, patch[event]);
    });
  }
}
