const ChatSidebar = () => {
  return (
    <aside className="w-80 border-r bg-base-100">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">
          Conversations
        </h2>
      </div>

      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-base-content/60">
          Conversations will appear here.
        </p>
      </div>
    </aside>
  );
};

export default ChatSidebar;