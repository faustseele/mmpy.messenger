import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import { cx } from "../../lib/helpers/formatting/classnames.ts";
import cssInput from "./input.module.css";
import { Input } from "./Input.ts";
import { InputConfigs, InputProps } from "./types.ts";

export const getInputNode = (
  configs: Omit<InputConfigs, "tagName">,
): ComponentNode<InputProps, Input> => {
  const params = getInputProps(configs);
  return {
    params,
    factory: buildInput,
    runtime: {
      instance: buildInput(params),
    },
  };
};

const getInputProps = (
  configs: Omit<InputConfigs, "tagName">,
): ComponentParams<InputProps> => {
  return {
    configs: {
      tagName: "label",
      ...configs,
    },
    attributes: {
      className: cx(`${cssInput.inputLabelWrap}`),
      for: configs.fieldId,
    },
  };
};

const buildInput: ComponentFactory<InputProps, Input> = (
  params: ComponentParams<InputProps>,
): Input => {
  const deps: ComponentDeps<InputProps> = {
    domService: new DOMService(
      params.configs.id,
      params.configs.tagName,
      params.attributes,
    ),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildInput,
  };

  return new Input({ deps, node });
};
