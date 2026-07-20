import { useQuery } from "@tanstack/react-query";

import { useStream } from "../providers/StreamChatProvider";

const useChat = () => {
  const { client } = useStream();

  const {
    data: channels = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["chat-channels"],
    enabled: !!client,
    queryFn: async () => {
      const filters = {
        type: "messaging",
        members: {
          $in: [client.userID],
        },
      };

      const sort = {
        last_message_at: -1,
      };

      const options = {
        watch: true,
        state: true,
      };

      return await client.queryChannels(filters, sort, options);
    },
  });

  return {
    channels,
    isLoading,
    error,
    refetch,
  };
};

export default useChat;
