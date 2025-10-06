import Handlebars from "handlebars";
import { BaseProps } from "../Component/model/base.types.ts";
import {
  ChildrenMap,
  ChildrenSchema,
  CombinedChildrenInstances
} from "../Component/model/children.types.ts";
import Component from "../Component/model/Component.ts";
import { ComponentConfigs } from "../Component/model/types.ts";

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
    children: CombinedChildrenInstances<BaseProps, ChildrenMap>,
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
  private _createDivPlaceholders(
    children: CombinedChildrenInstances<BaseProps, ChildrenMap>,
  ): Record<string, string> {
    const divPlaceholders: Record<string, string> = {};

    Object.entries(children).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const placeholdersList = value.map(
          (child) =>
            /* Setting placeholder for each child -> placeholdersList[] */
            `<div data-id="${child.id}"></div>`,
        );
        /* Concatenating placeholdersList[] into one string */
        divPlaceholders[key] = placeholdersList.join("");
      } else {
        divPlaceholders[key] = `<div data-id="${value.id}"></div>`;
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
    children: CombinedChildrenInstances<BaseProps, ChildrenMap>,
  ): DocumentFragment {
    Object.values(children).forEach((value) => {
      if (Array.isArray(value)) {
        const children = value;

        children.forEach((child) => {
          findAndReplace(child);
        });
      } else {
        const child = value;

        findAndReplace(child);
      }
    });

    function findAndReplace(child: Component<BaseProps, ChildrenMap, ChildrenSchema>) {
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
