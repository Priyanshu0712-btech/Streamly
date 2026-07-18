import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
} from "stream-chat-react";

import { useStream } from "../../providers/StreamChatProvider";
import ChatHeader from "./ChatHeader";

const ChatWindow = ({ channel }) => {
  const { client } = useStream();

  if (!client || !channel) return null;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChatHeader channel={channel} />

          <MessageList />

          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatWindow;