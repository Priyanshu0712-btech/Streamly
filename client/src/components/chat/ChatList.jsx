import { useState } from "react";

import useChat from "../../hooks/useChat";

import ChatItem from "./ChatItem";
import ChatSkeleton from "./ChatSkeleton";

const ChatList = () => {
  const { conversations, isLoading } = useChat();

  const [selectedChannel, setSelectedChannel] = useState(null);

  if (isLoading) {
    return <ChatSkeleton />;
  }

  if (!conversations.length) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-sm text-base-content/60">
          No conversations yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      {conversations.map((channel) => (
        <ChatItem
          key={channel.cid}
          channel={channel}
          isSelected={selectedChannel?.cid === channel.cid}
          onSelect={setSelectedChannel}
        />
      ))}
    </div>
  );
};

export default ChatList;