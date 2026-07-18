import MessageBubble from "./MessageBubble";

const demoMessages = [
  {
    id: 1,
    text: "Hi 👋",
    created_at: new Date(),
    isOwn: false,
  },
  {
    id: 2,
    text: "Hello!",
    created_at: new Date(),
    isOwn: true,
  },
];

const MessageList = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {demoMessages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.isOwn}
        />
      ))}
    </div>
  );
};

export default MessageList;