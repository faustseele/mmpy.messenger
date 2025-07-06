import profileAvatar from "../../../static/profile-avatar.png";
import { ComponentProps } from "../../core/Component/Component.d";
import Component from "../../core/Component/Component.ts";
import DOMService from "../../services/render/DOM/DOMService.ts";
import FragmentService from "../../services/render/FragmentService.ts";
import {
  createButton,
  createHeading,
  createInputEditor,
} from "../../utils/componentFactory.ts";
import pagesCss from "../pages.module.css";
import { IProfilePageData } from "./profile.d";
import css from "./profile.module.css";

export interface ProfilePageProps extends ComponentProps {
  configs: IProfilePageData;
}

export class ProfilePage extends Component {
  constructor(props: ProfilePageProps) {
    const { configs } = props;
    const { headingData, inputEditorData, buttonData } = configs;

    const children = {
      headings: headingData.map((headingProps) =>
        createHeading({ configs: headingProps }),
      ),
      inputs: inputEditorData.map((inputProps) =>
        createInputEditor({ configs: inputProps }),
      ),
      buttons: buttonData.map((buttonProps) =>
        createButton({ configs: buttonProps }),
      ),
    };

    const domService = new DOMService("div", {
      class: `${pagesCss.moduleWindow} ${css.moduleWindow_profile}`,
    });
    const templateService = new FragmentService();

    super({ configs }, children, domService, templateService);
  }

  public getSourceMarkup(): string {
    return /*html*/ `
      <header class="${css.profileHeadings}">
        {{{ headings }}}
      </header>
      
      <main class="${css.profileContent}">
        <div class="${css.profileFace}">
          <img alt="User's avatar" src="${profileAvatar}" />
          <h2 class="${css.profileFace__name}">{{__name}}</h2>
        </div>

        <div class="${css.profileInputs}">
          <div class="${css.profileInputs__list}">
            {{{ inputs }}}
          </div>
        </div>
      </main>

      <footer class="${css.profileFooter}">
        {{{ buttons }}}
      </footer>
    `;
  }
}
