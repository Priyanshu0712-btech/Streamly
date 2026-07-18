import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useStream } from "../providers/StreamChatProvider";

const useChat = () => {
  const { client } = useStream();

  const {
    data: channels = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chat-channels"],
    enabled: !!client,
    queryFn: async () => {
      const filters = {
        type: "messaging",
        members: { $in: [client.userID] },
      };

      const sort = {
        last_message_at: -1,
      };

      const options = {
        watch: true,
        state: true,
      };

      return client.queryChannels(filters, sort, options);
    },
  });

  const conversations = useMemo(() => channels, [channels]);

  return {
    conversations,
    isLoading,
    error,
  };
};

export default useChat;