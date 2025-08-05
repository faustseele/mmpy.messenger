import {
  ConcreteComponent,
  IChildrenData,
  IChildrenDataList,
  IChildrenList,
  IChildrenMap
} from "../framework/Component/Component.d";

export function createChildren(childrenData: IChildrenData): IChildrenMap {
  if (!childrenData) {
    throw new Error("Children are not defined", childrenData);
  }

  const childrenMap: IChildrenMap = {};

  Object.values(childrenData).forEach((childrenDataChunk) => {
    /* IChildrenDataList has slotName & componentFactory suitable for all list-elements */
    if (isChildrenDataList(childrenDataChunk)) {
      const childrenList = childrenDataChunk;
      const listFactory = childrenList.componentFactory;
      const listKey = childrenList.slotName;

      childrenMap[listKey] = {
        slotName: listKey,
        list: [],
        componentFactory: listFactory,
      };

      childrenList.list.forEach((childData) => {
        (childrenMap[listKey] as IChildrenDataList).list.push(
          listFactory(childData),
        );
      });
    } else {
      const childData = childrenDataChunk;
      const childInstance = childData.componentFactory(childData);
      childrenMap[childData.configs.slotName] = childInstance;
    }
  });

  return childrenMap;
}

export function isChildrenDataList(
  value: ConcreteComponent | IChildrenDataList,
): value is IChildrenDataList {
  return "slotName" in value && typeof value.slotName === "string";
}

export function isChildrenList(
  value: ConcreteComponent | IChildrenList,
): value is IChildrenList {
  return "slotName" in value && typeof value.slotName === "string";
}
