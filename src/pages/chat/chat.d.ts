import { Button } from "../../components/button/button.tmpl";
import { CatalogueItem } from "../../components/catalogueItem/catalogueItem.tmpl";
import { Heading } from "../../components/heading/heading.tmpl";
import { InputMessage } from "../../components/inputMessage/inputMessage.d";

export type ChatData = {
  headingData: Heading[];
  searchLabel: string;
  catalogueItemData: CatalogueItem[];
  inputMessage: InputMessage;
  chatData: {
    participantAvatar: string;
    participantName: string;
  };
  buttonData: Button[];
  messageData: Message[];
};
