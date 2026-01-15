import {
  ComponentDeps,
  ComponentNode,
  ComponentParams,
} from "../../lib/Component/model/types.ts";
import DOMService from "../../lib/DOM/DOMService.ts";
import FragmentService from "../../lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../lib/helpers/factory/types.ts";
import cssInput from "./input.module.css";
import { Input } from "./Input.ts";
import { InputConfigs, InputProps } from "./types.ts";

export const getInputNode = (
  configs: Omit<InputConfigs, "rootTag" | "classNames" | "for">,
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
  configs: Omit<InputConfigs, "rootTag" | "classNames" | "for">,
): ComponentParams<InputProps> => {
  return {
    configs: {
      rootTag: "label",
      classNames: cssInput.inputLabelWrap,
      for: configs.fieldId,
      ...configs,
    },
  };
};

const buildInput: ComponentFactory<InputProps, Input> = (
  params: ComponentParams<InputProps>,
): Input => {
  const { id, rootTag } = params.configs;

  const deps: ComponentDeps<InputProps> = {
    domService: new DOMService(id, rootTag),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildInput,
  };

  return new Input({ deps, node });
};
