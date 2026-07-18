import { Search } from "lucide-react";

const ChatSearch = () => {
  return (
    <div className="border-b p-4">
      <label className="input input-bordered flex items-center gap-2">
        <Search size={18} className="text-base-content/60" />
        <input
          type="text"
          className="grow"
          placeholder="Search conversations..."
        />
      </label>
    </div>
  );
};

export default ChatSearch;