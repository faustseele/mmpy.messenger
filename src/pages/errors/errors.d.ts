import { IButtonConfigs } from "../../components/button/button.d";
import { IHeadingConfigs } from "../../components/heading/heading.d";
import { ISubheadingConfigs } from "../../components/subheading/subheading.d";
import { IComponentConfigs } from "../../framework/Component/Component.d";

export type TErrorPage = "404" | "500";

export interface IErrorPageConfigs extends IComponentConfigs {
  __code: TErrorPage;
  headingConfigs: IHeadingConfigs;
  subheadingConfigs: ISubheadingConfigs;
  buttonConfigs: IButtonConfigs;
}
