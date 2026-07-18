import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAuthUser from "./useAuthUser";
import { getStreamToken } from "../lib/api";
import { streamClient } from "../lib/stream-chat";

const useStreamChat = () => {
  const { authUser } = useAuthUser();

  const [isConnecting, setIsConnecting] = useState(true);

  const [client, setClient] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["stream-token"],
    queryFn: getStreamToken,
    enabled: !!authUser,
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (!authUser || !data?.token) return;

    let mounted = true;

    const connect = async () => {
      try {
        setIsConnecting(true);

        await streamClient.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          data.token,
        );

        if (mounted) {
          setClient(streamClient);
        }

        console.log("Connected to Stream Chat");
      } catch (err) {
        console.error("Stream connection failed:", err);
      } finally {
        if (mounted) {
          setIsConnecting(false);
        }
      }
    };

    connect();

    return () => {
      mounted = false;

      streamClient.disconnectUser();
    };
  }, [authUser, data]);

  return {
    client,
    isLoading: isLoading || isConnecting,
    error,
  };
};

export default useStreamChat;
