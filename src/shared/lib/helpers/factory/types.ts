import { Page } from "../../../../pages/page/ui/Page.ts";
import { BaseProps } from "../../Component/model/base.types.ts";
import {
  ChildrenMap,
  ChildrenSchema,
} from "../../Component/model/children.types.ts";
import Component from "../../Component/model/Component.ts";
import { ComponentData } from "../../Component/model/types.ts";

export type ComponentFactory<
  TProps extends BaseProps,
  TComponent extends Component<TProps, TMap, TSchema>,
  TMap extends ChildrenMap = ChildrenMap,
  TSchema extends ChildrenSchema<TMap> = ChildrenSchema<TMap>,
> = (data: ComponentData<TProps, TMap, TSchema>) => TComponent;

export type PageFactory<
  TProps extends BaseProps,
  TPage extends Page<TProps, TMap, TSchema>,
  TMap extends ChildrenMap = ChildrenMap,
  TSchema extends ChildrenSchema<TMap> = ChildrenSchema<TMap>,
> = (data: ComponentData<TProps, TMap, TSchema>) => TPage;
