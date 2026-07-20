import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { streamChatClient } from "../lib/stream-chat";
import { getStreamToken } from "../lib/api";
import useAuthUser from "./useAuthUser";

const useStreamChat = () => {
  const { authUser } = useAuthUser();

  const [client, setClient] = useState(null);

  const connectedRef = useRef(false);

  const {
    data,
    isLoading: tokenLoading,
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

    let ignore = false;

    const connect = async () => {
      try {
        await streamChatClient.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          data.token,
        );

        if (ignore) return;

        connectedRef.current = true;
        setClient(streamChatClient);

        console.log("✅ Stream connected");
      } catch (err) {
        console.error("Stream connection failed:", err);
      }
    };

    connect();

    return () => {
      ignore = true;
    };
  }, [authUser, data]);

  useEffect(() => {
    return () => {
      if (connectedRef.current) {
        streamChatClient.disconnectUser();

        connectedRef.current = false;
        setClient(null);
      }
    };
  }, []);

  return {
    client,
    isLoading: tokenLoading || !client,
    error,
  };
};

export default useStreamChat;
