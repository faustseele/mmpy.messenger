import { ComponentFactory } from "../../utils/factory/factory.d";

/**
 * A public contract for a roster (e.g AuthChildrenPropsMap)
 * Used for correct key-value definitions in IChildrenData
 * e.g. 'K' for 'heading: HeadingProps' in IChildrenData
 * e.g. 'K' for 'heading: Heading' in IChildren
 */
export type ChildrenPropsMap = Record<string, BaseProps>;

export type IChildrenData<Map extends ChildrenPropsMap = ChildrenPropsMap> = {
  [PropsKey in keyof Map]:
    | {
        type: "single";
        data: ComponentData<Map[PropsKey]>;
      }
    | {
        type: "list";
        slotKey: K & string;
        dataList: ComponentData<Map[PropsKey]>[];
        childrenFactory: ComponentFactory<Map[PropsKey]>;
      };
};

/**
 * It's a proptery/state of the Component.
 */
export type IChildren<Map extends ChildrenPropsMap = ChildrenPropsMap> = {
  [ComponentKey in keyof Map]:
    | { type: "single"; child: Map[ComponentKey] }
    | {
        type: "list";
        slotKey: string;
        children: Map[ComponentKey][];
        childrenFactory: ComponentFactory<BaseProps>;
      };
};
