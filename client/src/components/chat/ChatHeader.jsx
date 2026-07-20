import { Phone, Video } from "lucide-react";

import { useStream } from "../../providers/StreamChatProvider";

const ChatHeader = ({ channel }) => {
  const { client } = useStream();

  if (!client || !channel) return null;

  const otherUser = Object.values(channel.state.members).find(
    (member) => member.user.id !== client.userID,
  )?.user;

  return (
    <div className="flex items-center justify-between border-b bg-base-100 p-4">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={otherUser?.image} alt={otherUser?.name} />
          </div>
        </div>

        <div>
          <h2 className="font-semibold">{otherUser?.name}</h2>

          <p
            className={`text-sm ${
              otherUser?.online ? "text-success" : "opacity-60"
            }`}
          >
            {otherUser?.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
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
