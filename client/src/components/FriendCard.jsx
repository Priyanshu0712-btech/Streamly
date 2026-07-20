import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useStream } from "../providers/StreamChatProvider";
import { useChatContext } from "../context/ChatContext";
import { BanIcon, EllipsisVerticalIcon, MessageCircleIcon } from "lucide-react";

import { LANGUAGE_TO_FLAG } from "../constants";
import { blockUser } from "../lib/api";

const FriendCard = ({ friend }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { client } = useStream();
  const { setSelectedChannel } = useChatContext();

  const { mutate: blockUserMutation, isPending } = useMutation({
    mutationFn: blockUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });

      /*
       * The blocked-users page will also receive
       * the latest data.
       */
      queryClient.invalidateQueries({
        queryKey: ["blockedUsers"],
      });

      /*
       * Refetch recommendations because blocking
       * affects which users should be recommended.
       */
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      console.error(
        "Failed to block user:",
        error?.response?.data?.message || "Something went wrong",
      );
    },
  });

  const handleBlockUser = () => {
    const shouldBlock = window.confirm(
      `Are you sure you want to block ${friend.fullName}?`,
    );

    if (!shouldBlock) {
      return;
    }

    blockUserMutation(friend._id);
  };

  const handleMessage = async () => {
    if (!client) return;

    try {
      console.time("Open Chat");

      // Unique channel id for every pair of users
      const channelId = [client.userID, friend._id].sort().join("-");

      console.log("Creating channel:", channelId);

      const channel = client.channel("messaging", channelId, {
        members: [client.userID, friend._id],
      });

      console.log("Watching channel...");

      await channel.watch();

      console.log("Channel ready");

      setSelectedChannel(channel);

      navigate("/chat");

      console.timeEnd("Open Chat");
    } catch (error) {
      console.error("Failed to open chat:", error);
      console.timeEnd("Open Chat");
    }
  };

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFORMATION */}

        <div className="flex items-center gap-3 mb-3">
          {/* PROFILE PICTURE */}

          <div className="avatar">
            <div className="size-12 rounded-full overflow-hidden">
              <img
                src={friend.profilePic || "/default-avatar.png"}
                alt={friend.fullName || "User profile"}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* USER NAME */}

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold truncate">{friend.fullName}</h3>
          </div>

          {/* OPTIONS MENU */}

          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label={`Open options for ${friend.fullName}`}
            >
              <EllipsisVerticalIcon className="size-5" />
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-20 w-48 p-2 shadow"
            >
              <li>
                <button
                  type="button"
                  className="text-error"
                  onClick={handleBlockUser}
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <BanIcon className="size-4" />
                  )}

                  {isPending ? "Blocking..." : "Block user"}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* LANGUAGE */}

        {friend.nativeLanguage && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="badge badge-secondary text-xs gap-1">
              {getLanguageFlag(friend.nativeLanguage)}
              Native: {friend.nativeLanguage}
            </span>
          </div>
        )}

        <button onClick={handleMessage} className="btn btn-outline w-full">
          <MessageCircleIcon className="size-4" />
          Message
        </button>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) {
    return null;
  }

  const normalizedLanguage = language.toLowerCase().trim();

  const countryCode = LANGUAGE_TO_FLAG[normalizedLanguage];

  if (!countryCode) {
    return null;
  }

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${normalizedLanguage} flag`}
      className="h-3 mr-1 inline-block"
    />
  );
}
