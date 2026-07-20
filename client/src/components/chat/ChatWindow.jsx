import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";

import { useStream } from "../../providers/StreamChatProvider";
import { useChatContext } from "../../context/ChatContext";

import EmptyChat from "./EmptyChat";
import ChatHeader from "./ChatHeader";

const ChatWindow = () => {
  const { client } = useStream();
  const { selectedChannel } = useChatContext();

  if (!selectedChannel) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyChat />
      </div>
    );
  }

  if (!client) return null;

  return (
    <Chat client={client}>
      <Channel channel={selectedChannel}>
        <Window>
          <ChatHeader channel={selectedChannel} />

          <MessageList />

          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatWindow;
