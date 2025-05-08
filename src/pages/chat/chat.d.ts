import { Button } from "../../components/button/button.tmpl";
import { CatalogueItem } from "../../components/catalogueItem/catalogueItem.tmpl";
import { Heading } from "../../components/heading/heading.tmpl";

export type ChatData = {
  headingData: Heading[];
  searchLabel: string;
  catalogueItemData: CatalogueItem[];
  inputMessageLabel: string;
  chatData: {
    participantAvatar: string;
    participantName: string;
  };
  buttonData: Button[];
  messageData: Message[];
};
