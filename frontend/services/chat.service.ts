import axios from "axios";

const chatApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v2",
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
