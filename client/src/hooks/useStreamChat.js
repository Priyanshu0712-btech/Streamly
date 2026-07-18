import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { streamChatClient } from "../lib/stream-chat";
import { getStreamToken } from "../lib/api";
import useAuthUser from "./useAuthUser";

const useStreamChat = () => {
  const { authUser } = useAuthUser();

  const [client, setClient] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Prevent multiple connections
  const connectedRef = useRef(false);

  const {
    data,
    isLoading: isTokenLoading,
    error,
  } = useQuery({
    queryKey: ["stream-token"],
    queryFn: getStreamToken,
    enabled: !!authUser,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  });

  useEffect(() => {
    if (
      !authUser ||
      !data?.token ||
      connectedRef.current ||
      streamChatClient.userID
    ) {
      return;
    }

    let mounted = true;

    const connect = async () => {
      try {
        setIsConnecting(true);

        await streamChatClient.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          data.token,
        );

        connectedRef.current = true;

        if (mounted) {
          setClient(streamChatClient);
        }

        console.log("Stream Chat Connected");
      } catch (err) {
        console.error("Failed to connect Stream:", err);
      } finally {
        if (mounted) {
          setIsConnecting(false);
        }
      }
    };

    connect();

    return () => {
      mounted = false;
    };
  }, [authUser, data]);

  useEffect(() => {
    return () => {
      if (connectedRef.current) {
        streamChatClient.disconnectUser();
        connectedRef.current = false;
      }
    };
  }, []);

  return {
    client,
    isLoading: isTokenLoading || isConnecting,
    error,
  };
};

export default useStreamChat;
