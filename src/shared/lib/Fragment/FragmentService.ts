import Handlebars from "handlebars";
import {
  BaseProps,
  ComponentConfigs,
} from "../../../framework/Component/component";
import Component from "../../../framework/Component/Component.ts";
import { Children } from "../../../framework/Component/children";

/**
 * @FragmentService – Stateless feature-service.
 * * Compiles markup with Handlebars
 * * Inserts children into the parent DocumentFragment (Element)
 * * * before attaching them to the DOM
 * @sourceMarkup is a raw HTML-string
 * E.g., sourceMarkup provided by concrete Components
 * @compiledSourceMarkup is a Handlebars-compiled HTML-string with placeholders
 * @parentElement & @childElement are ready-to-use HTML-Elements
 * Handled by DOMService
 * @children is a state with homogeneous children in each prop
 * @childrenList is an array of children with the same key
 */
export default class FragmentService<C extends ComponentConfigs> {
  /**
   * @returns DocumentFragment
   * DocumentFragment is an off-DOM lightweight container.
   * When appended to a DOM Element, its child nodes
   * are moved out of the DocumentFragment into the target Element.
   */
  public compile(sourceMarkup: string, configs: C): DocumentFragment {
    const compiledSourceMarkup = Handlebars.compile(sourceMarkup)(configs);
    return this._createFragmentFromString(compiledSourceMarkup);
  }

  public compileWithChildren(
    sourceMarkup: string,
    configs: C,
    children: Children,
  ): DocumentFragment {
    /* Creating <div id="random UUID"></div>.. placeholders for children */
    const divPlaceholders = this._createDivPlaceholders(children);

    /**
     * Handling {{expressions-configs}} & {{{children-html expressions}}}
     * Inserting placeholders into the sourceMarkup
     */
    const compiledSourceMarkupWithPlaceholders = Handlebars.compile(
      sourceMarkup,
    )({
      /* For {{{children-html expressions}}} */
      ...divPlaceholders,
      /* For {{config-expressions}} of a parent Component */
      ...configs,
    });

    /* Creating a DocumentFragment <div> children placeholders */
    const fragmentWithPlaceholders = this._createFragmentFromString(
      compiledSourceMarkupWithPlaceholders,
    );

    /* Swapping <div> children placeholders with corresponding Elements*/
    const fragmentWithElements = this._replacePlaceholdersInFragment(
      fragmentWithPlaceholders,
      children,
    );

    return fragmentWithElements;
  }

  /**
   * Generates an object with either one div-placeholder '<tag></tag>' by key
   * or a concatenated list of div-placeholders <tags> by key.
   */
  private _createDivPlaceholders(children: Children): Record<string, string> {
    const divPlaceholders: Record<string, string> = {};

    Object.values(children).forEach((childrenChunk) => {
      if (childrenChunk.type === "list") {
        const { children, slotKey } = childrenChunk;

        const placeholdersList = children.map(
          (child) =>
            /* Setting placeholder for each child -> placeholdersList[] */
            `<div data-id="${child.id}"></div>`,
        );

        /* Concatenating placeholdersList[] into one string */
        divPlaceholders[slotKey] = placeholdersList.join("");
      } else {
        const { child } = childrenChunk;
        const slotKey = child.configs.slotKey;

        divPlaceholders[slotKey] = `<div data-id="${child.id}"></div>`;
      }
    });

    return divPlaceholders;
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
  private _replacePlaceholdersInFragment(
    fragment: DocumentFragment,
    children: Children,
  ): DocumentFragment {
    Object.values(children).forEach((childrenChunk) => {
      if (childrenChunk.type === "list") {
        const { children } = childrenChunk;
        children.forEach((child) => {
          findAndReplace(child);
        });
      } else {
        const { child } = childrenChunk;
        findAndReplace(child);
      }
    });

    function findAndReplace(child: Component<BaseProps>) {
      const placeholder = fragment.querySelector(`[data-id="${child.id}"]`);
      const childElement = child.element;

      if (placeholder && childElement) {
        placeholder.replaceWith(childElement);
      } else {
        console.error(
          `FragmentService Error: Could not replace child placeholder.
          Child ID: ${child.id}.
          Placeholder found: ${!!placeholder}.
          Child element obtained: ${!!childElement}.
          DocumentFragment content:`,
          fragment,
        );
      }
    }

    return fragment;
  }
}
