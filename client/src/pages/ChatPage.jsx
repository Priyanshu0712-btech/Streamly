import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";

const ChatPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden rounded-lg border bg-base-100 shadow">
        <ChatSidebar />

        <div className="flex flex-1">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;