import { BaseProps } from "../../Component/model/base.types.ts";
import { ChildrenSchema } from "../../Component/model/children.types.ts";
import Component from "../../Component/model/Component.ts";
import { ComponentData } from "../../Component/model/types.ts";

export type ComponentFactory<
  TProps extends BaseProps,
  /* Def for childless components */
  TComponent extends Component<TProps>,
  TSchema extends ChildrenSchema = ChildrenSchema,
> = (data: ComponentData<TProps, TSchema>) => TComponent;
