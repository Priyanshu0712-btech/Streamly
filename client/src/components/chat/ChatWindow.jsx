import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { useStream } from "../../providers/StreamChatProvider";
import { useChatContext } from "../../context/ChatContext";

import EmptyChat from "./EmptyChat";
import ChatHeader from "./ChatHeader";

const ChatWindow = () => {
  const { client } = useStream();
  const { selectedChannel } = useChatContext();

  if (!client) return null;

  if (!selectedChannel) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <EmptyChat />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Chat client={client}>
        <Channel channel={selectedChannel}>
          <Window>
            <ChatHeader channel={selectedChannel} />
            <MessageList />
            <MessageInput focus />
          </Window>

          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatWindow;
