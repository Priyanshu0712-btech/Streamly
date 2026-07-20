import { Search } from "lucide-react";

import useChat from "../../hooks/useChat";
import { useChatContext } from "../../context/ChatContext";
import { useStream } from "../../providers/StreamChatProvider";

import ChatSkeleton from "./ChatSkeleton";

const ChatSidebar = () => {
  const { client } = useStream();
  const { channels, isLoading } = useChat();
  const { selectedChannel, setSelectedChannel } = useChatContext();

  if (isLoading || !client) {
    return (
      <aside className="w-80 border-r">
        <ChatSkeleton />
      </aside>
    );
  }

  return (
    <aside className="flex h-full w-full flex-col border-r bg-base-100 md:w-80 lg:w-96">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">Chats</h2>
      </div>

      <div className="border-b p-4">
        <label className="input input-bordered flex items-center gap-2">
          <Search size={18} />
          <input type="text" className="grow" placeholder="Search..." />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto">
        {channels.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm opacity-60">
            No conversations
          </div>
        ) : (
          channels.map((channel) => {
            const members = Object.values(channel.state.members);

            const otherUser = members.find(
              (member) => member.user?.id !== client.userID,
            )?.user;

            const lastMessage =
              channel.state.messages[channel.state.messages.length - 1];

            return (
              <button
                key={channel.cid}
                onClick={() => setSelectedChannel(channel)}
                className={`flex w-full items-center gap-3 border-b p-4 text-left transition hover:bg-base-200 ${
                  selectedChannel?.cid === channel.cid ? "bg-base-200" : ""
                }`}
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={otherUser?.image || "/default-avatar.png"}
                      alt={otherUser?.name || "User"}
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {otherUser?.name || "Unknown User"}
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
