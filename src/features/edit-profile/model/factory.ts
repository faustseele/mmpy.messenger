import {
  ComponentDeps,
  ComponentId,
  ComponentNode,
  ComponentParams
} from "../../../shared/lib/Component/model/types.ts";
import DOMService from "../../../shared/lib/DOM/DOMService.ts";
import FragmentService from "../../../shared/lib/Fragment/FragmentService.ts";
import { ComponentFactory } from "../../../shared/lib/helpers/factory/types.ts";
import css from "../../../shared/ui/Input/input.module.css";
import { Input } from "../../../shared/ui/Input/Input.ts";
import { FieldType, InputConfigs, InputProps } from "../../../shared/ui/Input/types.ts";
import { InputEditor } from "../ui/InputEditor.ts";

export const getEditorNode = (
  id: ComponentId,
  fieldId: FieldType,
  label: string,
  placeholder: string,
  type: InputProps["configs"]["type"],
  isError?: boolean,
  isSearch?: boolean,
  autocomplete?: InputConfigs["autocomplete"],
  errorMessage?: string,
): ComponentNode<InputProps, InputEditor> => {
  const params = getEditorProps(id, fieldId, label, placeholder, type, isError, isSearch, autocomplete, errorMessage);
  return {
    params,
    factory: buildInputEditor,
    runtime: {
      instance: buildInputEditor(params),
    },
  };
};

const getEditorProps = (
  id: ComponentId,
  fieldId: FieldType,
  label: string,
  placeholder: string,
  type: InputProps["configs"]["type"],
  isError?: boolean,
  isSearch?: boolean,
  autocomplete?: InputConfigs["autocomplete"],
  errorMessage?: string,
): ComponentParams<InputProps> => ({
  configs: {
    id,
    tagName: "label",
    fieldId,
    label,
    type,
    placeholder,
    isError: isError ?? false,
    isSearch: isSearch ?? false,
    autocomplete: autocomplete ?? "off",
    errorMessage: errorMessage ?? "",
  },
  attributes: {
    className: css.inputLabelWrap,
    for: fieldId,
  },
});

const buildInputEditor: ComponentFactory<InputProps, Input> = (
  params: ComponentParams<InputProps>,
): InputEditor => {
  const deps: ComponentDeps<InputProps> = {
    domService: new DOMService(params.configs.id, params.configs.tagName, params.attributes),
    fragmentService: new FragmentService(),
  };

  const node = {
    params,
    factory: buildInputEditor,
  };

  return new InputEditor({ deps, node });
};
