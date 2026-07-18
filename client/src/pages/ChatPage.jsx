import { useState } from "react";

import ChatSidebar from "../components/chat/ChatSidebar";
import EmptyChat from "../components/chat/EmptyChat";
import ChatWindow from "../components/chat/ChatWindow";

const ChatPage = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden rounded-lg border bg-base-100 shadow">
        <ChatSidebar
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
        />

        <div className="flex flex-1">
          {selectedChannel ? (
            <ChatWindow channel={selectedChannel} />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <EmptyChat />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
