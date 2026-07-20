import { Search } from "lucide-react";

import useChat from "../../hooks/useChat";
import { useChatContext } from "../../context/ChatContext";

import ChatSkeleton from "./ChatSkeleton";

const ChatSidebar = () => {
  const { channels, isLoading } = useChat();
  const { selectedChannel, setSelectedChannel } = useChatContext();

  if (isLoading) {
    return (
      <aside className="w-80 border-r">
        <ChatSkeleton />
      </aside>
    );
  }

  return (
    <aside className="flex w-80 flex-col border-r bg-base-100">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">Chats</h2>
      </div>

      {/* Search */}
      <div className="border-b p-4">
        <label className="input input-bordered flex items-center gap-2">
          <Search size={18} />
          <input
            type="text"
            className="grow"
            placeholder="Search..."
          />
        </label>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {channels.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm opacity-60">
            No conversations
          </div>
        ) : (
          channels.map((channel) => {
            const otherUser = Object.values(channel.state.members).find(
              (member) => member.user.id !== channel.client.userID
            )?.user;

            const lastMessage =
              channel.state.messages[channel.state.messages.length - 1];

            return (
              <button
                key={channel.cid}
                onClick={() => setSelectedChannel(channel)}
                className={`flex w-full items-center gap-3 border-b p-4 text-left transition hover:bg-base-200 ${
                  selectedChannel?.cid === channel.cid
                    ? "bg-base-200"
                    : ""
                }`}
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={otherUser?.image}
                      alt={otherUser?.name}
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {otherUser?.name}
                  </h3>

                  <p className="truncate text-sm opacity-60">
                    {lastMessage?.text || "Start chatting"}
                  </p>
                </div>

                {otherUser?.online && (
                  <span className="h-3 w-3 rounded-full bg-success"></span>
                )}
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;