import { Send } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="border-t p-4">
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;