import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import { useChatContext } from "../context/ChatContext";

const ChatPage = () => {
  const { selectedChannel } = useChatContext();

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div
        className={`
          w-full md:w-80 lg:w-96
          ${selectedChannel ? "hidden md:block" : "block"}
        `}
      >
        <ChatSidebar />
      </div>

      {/* Chat Window */}
      <div
        className={`
          flex-1
          ${selectedChannel ? "block" : "hidden md:flex"}
        `}
      >
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;