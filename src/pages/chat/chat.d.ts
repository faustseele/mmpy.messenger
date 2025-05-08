import { CatalogueItem } from "../../components/catalogueItem/catalogueItem.tmpl";
import { Heading } from "../../components/heading/heading.tmpl";

export type ChatsData = {
  headingData: Heading[];
  searchLabel: string;
  catalogueItemData: CatalogueItem[];
  button_removeChat: string;
  inputMessageLabel: string;
};
