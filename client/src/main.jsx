import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "stream-chat-react/dist/css/v2/index.css";

import { BrowserRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StreamChatProvider } from "./providers/StreamChatProvider";
import { ChatProvider } from "./context/ChatContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ChatProvider>
            <App />
          </ChatProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>,
);
