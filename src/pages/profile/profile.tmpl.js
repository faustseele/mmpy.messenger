import Handlebars from "handlebars";
import regInputEditor from "../../components/input/inputEditor.tmpl";
import { profileData } from "./data";
import cssPages from "../pages.module.css"
import css from "./profile.module.css"
import profileAvatar from "../../../static/profile-avatar.png"

export function getProfilePage() {
  regInputEditor()

  const html =
    /* html */
    `<div class="${cssPages.moduleWindow} ${css.moduleWindow_profile}">
      <header class="${css.profileHeadings}">
        {{> heading}}
      </header>
      
      <main class="${css.profileContent}">
        <div class="${css.profileFace}">
          <img alt="User's avatar" src="${profileAvatar}" />
          <h2 class="${css.profileFace__name}">{{profileData.name}}</h2>
        </div>

        <div class="${css.profileInputs}">
          <div class="${css.profileInputs__list}">
            {{> inputEditor}}
          </div>
        </div>
      </main>

      <footer class="${css.profileFooter}">
        {{> button}}
      </footer>
    </div>`;

  const compiledTemplate = Handlebars.compile(html);
  const renderedTemplate = compiledTemplate(profileData);

  return renderedTemplate;
}
