import { IChildrenData, IChildren, ChildrenPropsMap } from "../../framework/Component/Children.d";

export function createChildren (data: IChildrenData<ChildrenPropsMap>): IChildren<ChildrenPropsMap> {
  if (!data) {
    throw new Error("childrenData are not defined", data);
  }

  const children: IChildren = {};

  Object.values(data).forEach((dataChunk) => {
    if (dataChunk.type === "list") {
      const { slotKey, childrenFactory, dataList } = dataChunk;

      children[slotKey] = {
        type: "list",
        slotKey,
        children: dataList.map((childData) => childrenFactory(childData)),
        childrenFactory,
      };
    } else if (dataChunk.type === "single") {
      const { data } = dataChunk;
      const slotKey = data.configs.slotKey;
      const childFactory = data.componentFactory;

      children[slotKey] = {
        type: "single",
        child: childFactory(data),
      };
    } else {
      throw new Error("Wrong children data type", dataChunk);
    }
  });

  return children;
}
