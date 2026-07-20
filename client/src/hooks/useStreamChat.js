import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { streamChatClient } from "../lib/stream-chat";
import { getStreamToken } from "../lib/api";
import useAuthUser from "./useAuthUser";

const useStreamChat = () => {
  const { authUser } = useAuthUser();
  const [client, setClient] = useState(null);

  const {
    data,
    isLoading: tokenLoading,
    error,
  } = useQuery({
    queryKey: ["stream-token"],
    queryFn: getStreamToken,
    enabled: !!authUser,
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (!authUser || !data?.token) return;

    const connect = async () => {
      try {
        // Already connected as this user
        if (streamChatClient.userID === authUser._id) {
          setClient(streamChatClient);
          return;
        }

        // Connected as someone else
        if (streamChatClient.userID) {
          await streamChatClient.disconnectUser();
        }

        await streamChatClient.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          data.token,
        );

        setClient(streamChatClient);
      } catch (err) {
        console.error("Stream connection failed:", err);
      }
    };

    connect();
  }, [authUser, data]);

  return {
    client,
    isLoading: tokenLoading || !client,
    error,
  };
};

export default useStreamChat;
