import useChat from "../../hooks/useChat";

import ChatItem from "./ChatItem";
import ChatSkeleton from "./ChatSkeleton";

const ChatList = ({
  selectedChannel,
  setSelectedChannel,
}) => {
  const { conversations, isLoading } = useChat();

  if (isLoading) return <ChatSkeleton />;

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