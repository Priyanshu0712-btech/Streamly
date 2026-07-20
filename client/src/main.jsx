import { StrictMode } from "react";
import React from "react";
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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ChatProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
