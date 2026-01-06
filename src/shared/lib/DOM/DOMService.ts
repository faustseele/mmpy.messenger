import { BaseProps } from "../Component/model/base.types.ts";
import { ComponentId } from "../Component/model/types.ts";
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
  private _classNames: P["configs"]["classNames"] = "";
  private _element: HTMLElement | null = null;
  private _id: ComponentId;
  public get element(): HTMLElement | null {
    return this._element;
  }

  constructor(id: ComponentId, tagName: TagNameType, classNames: string = "") {
    this._id = id;
    this._tagName = tagName;
    this._classNames = classNames;
  }

  public createElement() {
    if (this._element) return;

    /* creates an empty tag-element */
    const element = document.createElement(this._tagName);

    /* sets identifier for el-search */
    element.setAttribute("data-id", this._id);

    this._element = this._setClassNames(element);
  }

  private _setClassNames(element: HTMLElement): HTMLElement {
    if (!this._classNames) return element;

    /* adding classes to the element */
    element.className = "";
    element.classList.add(...this._classNames.split(" "));
    return element;
  }

  public updateClassNames(classNames: string): void {
    if (!this._element) {
      console.warn("Cannot update classNames: DOMService element is null.");
      return;
    }

    this._element.className = "";
    this._element.classList.add(...classNames.split(" "));
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
