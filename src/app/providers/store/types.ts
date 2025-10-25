import { BaseProps } from "../../../shared/lib/Component/model/base.types.ts";
import { ComponentPatch } from "../../../shared/lib/Component/model/types.ts";
import { AppState } from "./Store.ts";

export type StoreEventBusEvents = "updated";

export type MapStateToProps<P extends BaseProps> = (state: AppState) => ComponentPatch<P>;

