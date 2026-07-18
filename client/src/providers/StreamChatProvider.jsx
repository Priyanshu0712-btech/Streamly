import { createContext, useContext } from "react";

import useStreamChat from "../hooks/useStreamChat";

const StreamChatContext = createContext(null);

export const StreamChatProvider = ({ children }) => {
  const value = useStreamChat();

  return (
    <StreamChatContext.Provider value={value}>
      {children}
    </StreamChatContext.Provider>
  );
};

export const useStream = () => {
  const context = useContext(StreamChatContext);

  if (!context) {
    throw new Error(
      "useStream must be used inside StreamChatProvider"
    );
  }

  return context;
};