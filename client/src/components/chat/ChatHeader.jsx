import { ArrowLeft, Phone, Video } from "lucide-react";

import { useStream } from "../../providers/StreamChatProvider";
import { useChatContext } from "../../context/ChatContext";

const ChatHeader = ({ channel }) => {
  const { client } = useStream();
  const { setSelectedChannel } = useChatContext();

  if (!client || !channel) return null;

  const otherUser = Object.values(channel.state.members).find(
    (member) => member.user?.id !== client.userID
  )?.user;

  return (
    <div className="flex items-center justify-between border-b bg-base-100 p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelectedChannel(null)}
          className="btn btn-circle btn-ghost md:hidden"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={otherUser?.image || "/default-avatar.png"}
              alt={otherUser?.name || "User"}
            />
          </div>
        </div>

        <div>
          <h2 className="font-semibold">
            {otherUser?.name || "Unknown User"}
          </h2>

          <p
            className={`text-sm ${
              otherUser?.online
                ? "text-success"
                : "text-base-content/60"
            }`}
          >
            {otherUser?.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn btn-circle btn-ghost">
          <Phone size={18} />
        </button>

        <button className="btn btn-circle btn-ghost">
          <Video size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;