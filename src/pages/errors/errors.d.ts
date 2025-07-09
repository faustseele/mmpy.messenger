import { IButtonData } from "../../components/button/button.d";
import { IHeadingData } from "../../components/heading/heading.d";
import { ISubheadingData } from "../../components/subheading/subheading.d";
import { ComponentConfigs } from "../../core/Component/Component.d";

export type TErrorPage = "404" | "500";

export interface IErrorPageData extends ComponentConfigs {
  __code: TErrorPage;
  headingData: IHeadingData;
  subheadingData: ISubheadingData;
  buttonData: IButtonData;
}
