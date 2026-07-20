import { Chat, Channel, Window } from "stream-chat-react";
import { useStream } from "../../providers/StreamChatProvider";

import ChatHeader from "./ChatHeader";
import CustomMessageList from "./MessageList";
import CustomMessageInput from "./MessageInput";

const ChatWindow = ({ channel }) => {
  const { client } = useStream();

  if (!client || !channel) return null;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChatHeader channel={channel} />

          <CustomMessageList />

          <CustomMessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatWindow;