import { useStream } from "../../providers/StreamChatProvider";

const ChatItem = ({ channel, isSelected, onSelect }) => {
  const { client } = useStream();

  const currentUserId = client?.userID;

  const members = Object.values(channel.state.members);

  const otherMember = members.find(
    (member) => member.user.id !== currentUserId
  )?.user;

  const lastMessage =
    channel.state.messages[channel.state.messages.length - 1];

  return (
    <button
      onClick={() => onSelect(channel)}
      className={`w-full border-b p-4 text-left transition hover:bg-base-200 ${
        isSelected ? "bg-base-200" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src={otherMember?.image}
              alt={otherMember?.name}
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">
            {otherMember?.name}
          </h3>

          <p className="truncate text-sm text-base-content/60">
            {lastMessage?.text || "Start chatting"}
          </p>
        </div>

        {otherMember?.online && (
          <span className="h-3 w-3 rounded-full bg-success"></span>
        )}
      </div>
    </button>
  );
};

export default ChatItem;