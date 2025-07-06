import Handlebars from "handlebars";
import {
  ComponentChildren,
  ComponentConfigs,
} from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";

/**
 * @FragmentService – Stateless feature-service.
 * * Compiles markup with Handlebars
 * * Inserts children into the parent DocumentFragment (Element)
 * * * before attaching them to the DOM
 * @sourceMarkup is a raw HTML-string
 * E.g., sourceMarkup provided by concrete Components
 * @compiledSourceMarkup is a Handlebars-compiled HTML-string with configs
 * I.e. the result after Handlebars compiling
 * @parentElement & @childElement are ready-to-use HTML-Elements
 * Handled by DOMService
 * @childrenMap is a state with homogeneous children in each prop
 * @childrenGroup is an array of children with the same key
 */
export default class FragmentService {
  /**
   * @returns DocumentFragment
   * DocumentFragment is an off-DOM lightweight container.
   * When appended to a DOM Element, its child nodes
   * are moved out of the DocumentFragment into the target Element.
   */
  public compile(
    sourceMarkup: string,
    configs: ComponentConfigs,
    childrenMap: ComponentChildren,
  ): DocumentFragment {
    const hasChildren = Object.keys(childrenMap).length > 0;

    /* Preparing a new configs object for Handlebars
      to avoid mutating the original */
    const configsWithPlaceholders = hasChildren
      ? this._injectPlaceholders(configs, childrenMap)
      : configs;

    const compiledSourceMarkup = Handlebars.compile(sourceMarkup)(
      configsWithPlaceholders,
    );

    const fragment = this._createFragmentFromString(compiledSourceMarkup);

    if (hasChildren) this._replacePlaceholders(fragment, childrenMap);

    return fragment;
  }

  /**
   * Creates placeholder markup for each childrenGroup[] and injects it
   * into a copy of the configs object for Handlebars to compile.
   */
  private _injectPlaceholders(
    configs: ComponentConfigs,
    childrenMap: ComponentChildren,
  ): ComponentConfigs {
    Object.entries(childrenMap).forEach(([key, childrenGroup]) => {
      configs[key] = this._createMarkupForGroup(childrenGroup);
    });

    return configs;
  }

  /**
   * Generates a single HTML string of placeholder
   * divs for an array of components.
   */
  private _createMarkupForGroup(childrenGroup: Component[]): string {
    const placeholders = childrenGroup.map(
      (childInstance) => `<div data-id="${childInstance.id}"></div>`,
    );
    return placeholders.join("");
  }

  /**
   * Creates a DocumentFragment from a raw HTML string.
   */
  private _createFragmentFromString(htmlString: string): DocumentFragment {
    return document.createRange().createContextualFragment(htmlString);
  }

  /**
   * Iterates through the fragment and replaces all placeholder divs
   * with their corresponding, real component elements.
   */
  private _replacePlaceholders(
    fragment: DocumentFragment,
    childrenMap: ComponentChildren,
  ): void {
    Object.values(childrenMap).forEach((childrenGroup) => {
      childrenGroup.forEach((childInstance) => {
        const placeholder = fragment.querySelector(
          `[data-id="${childInstance.id}"]`,
        );
        const childElement = childInstance.getElement();

        if (placeholder && childElement) {
          placeholder.replaceWith(childElement);
        } else {
          console.error(
            `FragmentService Error: Could not replace child placeholder.
            Child ID: ${childInstance.id}.
            Placeholder found: ${!!placeholder}.
            Child element obtained: ${!!childElement}.
            DocumentFragment content:`,
            fragment,
          );
        }
      });
    });
  }
}
