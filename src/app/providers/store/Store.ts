import { UserResponse } from "../../../../entities/user/model/types.ts";
import EventBus from "../../../../shared/lib/EventBus/EventBus.ts";
import { StoreEventBusEvents } from "../types.ts";
import { set } from "./utils.ts";


export interface AppState {
  isLoggedIn: boolean;
  user: UserResponse | null;
}

class Store extends EventBus<StoreEventBusEvents> {

  private static __instance: Store;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.__instance) {
      this.__instance = new Store();
    }
    return this.__instance;
  }

  private state: AppState = {
    isLoggedIn: false,
    user: null,
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    // Pass the new state to the subscribers
    this.emit('updated', this.getState());
  }
}

export default Store.getInstance();
