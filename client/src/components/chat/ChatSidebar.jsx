import ChatList from "./ChatList";
import ChatSearch from "./ChatSearch";

const ChatSidebar = ({
  selectedChannel,
  setSelectedChannel,
}) => {
  return (
    <aside className="flex lg:w-96 flex-col border-r bg-base-100">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">
          Conversations
        </h2>
      </div>

      <ChatSearch />

      <div className="flex-1 overflow-hidden">
        <ChatList />
      </div>
    </aside>
  );
};

export default ChatSidebar;