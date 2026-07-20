import { MessageCircle } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="rounded-full bg-primary/10 p-6">
        <MessageCircle
          className="text-primary"
          size={48}
        />
      </div>

      <h2 className="text-2xl font-bold">
        Welcome to Streamly Chat
      </h2>

      <p className="max-w-md text-base-content/60">
        Select a conversation from the sidebar to start chatting.
      </p>
    </div>
  );
};

export default EmptyChat;