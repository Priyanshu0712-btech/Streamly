import { StreamChat } from "stream-chat";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

if (!apiKey) {
  throw new Error("VITE_STREAM_API_KEY is missing");
}

export const streamClient = StreamChat.getInstance(apiKey);