import axios from "axios";
import { SEARCH_API_URL } from "@/lib/config";

const chatApi = axios.create({
  baseURL: SEARCH_API_URL,
  timeout: 60000,
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponse {
  reply: string;
}

export const sendMessage = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  const response = await chatApi.post<ChatResponse>("/chat", {
    message,
    history,
  });
  return response.data.reply;
};
