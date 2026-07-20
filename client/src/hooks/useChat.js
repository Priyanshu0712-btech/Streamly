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
    queryKey: ["chat-channels", client?.userID],
    enabled: !!client,
    queryFn: async () => {
      return client.queryChannels(
        {
          type: "messaging",
          members: {
            $in: [client.userID],
          },
        },
        {
          last_message_at: -1,
        },
        {
          watch: true,
          state: true,
        }
      );
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