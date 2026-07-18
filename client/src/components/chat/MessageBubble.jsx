const MessageBubble = ({ message, isOwn }) => {
  return (
    <div
      className={`chat ${
        isOwn ? "chat-end" : "chat-start"
      }`}
    >
      <div
        className={`chat-bubble ${
          isOwn
            ? "chat-bubble-primary"
            : "chat-bubble-secondary"
        }`}
      >
        {message.text}
      </div>

      <div className="chat-footer text-xs opacity-60">
        {new Date(message.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default MessageBubble;