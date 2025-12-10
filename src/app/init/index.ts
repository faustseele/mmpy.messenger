import AuthService from "@/features/authenticate/model/AuthService.ts";
import Store from "../providers/store/model/Store.ts";
import ChatService from "@/entities/chat/model/ChatService.ts";

/** initilizes application; keeps Router separate */
export const initApp = async () => {
  await bootstrapAuth();
};

const bootstrapAuth = async () => {
  try {
    await AuthService.fetchUser();
    const isLoggedIn = Store.getState().controllers.isLoggedIn;
    console.log("bootstrapAuth: isLoggedIn?", isLoggedIn);

    if (isLoggedIn) {
      await ChatService.fetchChats();
    }
  } catch (_) {
    console.error("Failed to fetch user on startup");
  }
};
