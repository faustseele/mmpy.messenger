import { IComponentChildren } from "../../framework/Component/Component.d";
import {
  createButton,
  createHeading,
  createInput,
} from "../../utils/componentFactory.ts";
import { IAuthPageConfigs } from "./auth.d";

export const createChildren = (configs: IAuthPageConfigs) => {
  const { headingConfigs, inputConfigs, buttonProps_reroute, buttonProps_submit } =
    configs;

  const children = {
    buttonReroute: createButton(buttonProps_reroute),
    buttonFormSubmit: createButton(buttonProps_submit),
    heading: createHeading({ configs: headingConfigs }),
    inputs: inputConfigs.map((inputProps) =>
      createInput({ configs: inputProps }),
    ),
  } satisfies IComponentChildren;

  /**
   * @operator 'satisfies' validates that 'children'
   * match IComponentChildren without changing
   * the inferred type of 'children'.
   * E.g. __buttonReroute – Button[], __inputs – Input[].
   * */

  return children;
};
