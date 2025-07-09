import { ComponentChildren } from "../../core/Component/Component.d";
import {
  createButton,
  createHeading,
  createInput,
} from "../../utils/componentFactory.ts";
import { IAuthPageData } from "./auth.d";

export const createChildren = (configs: IAuthPageData) => {
  const { headingData, inputData, buttonData_reroute, buttonData_submit } =
    configs;

  const children = {
    __buttonReroute: [createButton(buttonData_reroute)],
    __buttonFormSubmit: [createButton(buttonData_submit)],
    __heading: [createHeading({ configs: headingData[0] })],
    __inputs: inputData.map((inputProps) =>
      createInput({ configs: inputProps }),
    ),
  } satisfies ComponentChildren;

  /**
   * @operator 'satisfies' validates that 'children'
   * match ComponentChildren without changing
   * the inferred type of 'children'.
   * E.g. __buttonReroute – Button[], __inputs – Input[].
   * */

  return children;
};
