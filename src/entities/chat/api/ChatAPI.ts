import HTTPTransport from "../../../shared/api/http/HTTPTransport.ts";
import { BaseAPI } from "../../../shared/api/model/BaseAPI.ts";
import { ChatResponse } from "../model/types.ts";

const chatsAPIInstance = new HTTPTransport("/chats");

class ChatAPI extends BaseAPI {
  public getChats(): Promise<ChatResponse[]> {
    return chatsAPIInstance.get("/chats") as Promise<ChatResponse[]>;
  }
}

export default new ChatAPI();
