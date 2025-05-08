import { CatalogueItem } from "../../components/catalogueItem/catalogueItem.tmpl";
import { Heading } from "../../components/heading/heading.tmpl";

export type ChatData = {
  headingData: Heading[];
  searchLabel: string;
  catalogueItemData: CatalogueItem[];
  button_removeChat: string;
  inputMessageLabel: string;
  chatData: {
    particantAvatar: string;
    participantName: string;
  };
};
