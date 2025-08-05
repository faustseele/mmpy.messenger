import Handlebars from "handlebars";
import {
  ConcreteComponent,
  IChildrenMap,
  IComponentConfigs
} from "../../../framework/Component/Component.d";
import { isChildrenList } from "../../../utils/componentFactory.ts";

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
 * @childrenMap is a state with homogeneous children in each prop
 * @childrenList is an array of children with the same key
 */
export default class FragmentService<C extends IComponentConfigs> {
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
    childrenMap: IChildrenMap,
  ): DocumentFragment {
    /* Creating <div id="random UUID"></div>.. placeholders for children */
    const divPlaceholders = this._createDivPlaceholders(childrenMap);

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
      childrenMap,
    );

    return fragmentWithElements;
  }

  /**
   * Generates an object with either one div-placeholder '<tag></tag>' by key
   * or a concatenated list of div-placeholders <tags> by key.
   */
  private _createDivPlaceholders(
    childrenMap: IChildrenMap,
  ): Record<string, string> {
    const divPlaceholders: Record<string, string> = {};

    Object.values(childrenMap).forEach((childrenMapChunk) => {
      if (isChildrenList(childrenMapChunk)) {
        const childrenList = childrenMapChunk;
        const childrenListKey = childrenList.slotName;

        const placeholdersList = childrenList.list.map(
          (child) =>
            /* Setting placeholder for each child -> placeholdersList[] */
            `<div data-id="${child.id}"></div>`,
        );

        /* Concatenating placeholdersList[] into one string */
        divPlaceholders[childrenListKey] = placeholdersList.join("");
      } else {
        const child = childrenMapChunk;
        const childKey = child.configs.slotName;

        divPlaceholders[childKey] = `<div data-id="${child.id}"></div>`;
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
    childrenMap: IChildrenMap,
  ): DocumentFragment {
    Object.values(childrenMap).forEach((childrenMapChunk) => {
      if (isChildrenList(childrenMapChunk)) {
        const childrenList = childrenMapChunk;
        childrenList.list.forEach((child) => {
          findAndReplace(child);
        });
      } else {
        const child = childrenMapChunk;
        findAndReplace(child);
      }
    });

    function findAndReplace(child: ConcreteComponent) {
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
