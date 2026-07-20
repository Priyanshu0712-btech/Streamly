import { createContext, useContext, useMemo, useState } from "react";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  const value = useMemo(
    () => ({
      selectedChannel,
      setSelectedChannel,
    }),
    [selectedChannel],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used inside ChatProvider");
  }

  return context;
};
