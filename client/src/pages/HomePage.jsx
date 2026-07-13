import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";

import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();

  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());

  // Get current user's friends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Get recommended users
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  // Get outgoing friend requests
  const { data: outgoingFriendReqs, isLoading: loadingOutgoingRequests } =
    useQuery({
      queryKey: ["outgoingFriendReqs"],
      queryFn: getOutgoingFriendReqs,
    });

  // Send friend request
  const {
    mutate: sendRequestMutation,
    isPending,
    variables: pendingUserId,
  } = useMutation({
    mutationFn: sendFriendRequest,

    onSuccess: (_, userId) => {
      // Immediately update the button
      setOutgoingRequestIds((previousIds) => {
        const updatedIds = new Set(previousIds);

        updatedIds.add(userId);

        return updatedIds;
      });

      // Refetch outgoing requests from the backend
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendReqs"],
      });
    },

    onError: (error) => {
      console.error(
        "Failed to send friend request:",
        error?.response?.data?.message || "Something went wrong",
      );
    },
  });

  useEffect(() => {
    const requests = Array.isArray(outgoingFriendReqs)
      ? outgoingFriendReqs
      : outgoingFriendReqs?.requests || [];

    const requestIds = new Set();

    requests.forEach((request) => {
      const recipientId = request.recipient?._id || request.recipient;

      if (recipientId) {
        requestIds.add(recipientId.toString());
      }
    });

    setOutgoingRequestIds(requestIds);
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* FRIENDS HEADER */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>

          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* FRIEND LIST */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* RECOMMENDED USERS */}
        <section>
          {/* HEADER */}

          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Meet New Friends
            </h2>

            <p className="opacity-70">
              Discover new friends based on your profile.
            </p>
          </div>

          {/* LOADING */}

          {loadingUsers || loadingOutgoingRequests ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            /* NO RECOMMENDATIONS */

            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>

              <p className="text-base-content opacity-70">
                Check back later for new people!
              </p>
            </div>
          ) : (
            /* USER GRID */

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const userId = user._id.toString();

                const hasRequestBeenSent = outgoingRequestIds.has(userId);
                const isSendingToThisUser =
                  isPending && pendingUserId === userId;

                return (
                  <div
                    key={userId}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      {/* USER DETAILS */}

                      <div className="flex items-center gap-3">
                        {/* PROFILE PICTURE */}

                        <div className="avatar">
                          <div className="size-16 rounded-full overflow-hidden">
                            <img
                              src={user.profilePic }
                              alt={user.fullName || "User profile"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* NAME AND LOCATION */}

                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.fullName}
                          </h3>

                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />

                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* LANGUAGE */}

                      {user.nativeLanguage && (
                        <div className="flex flex-wrap gap-1.5">
                          <span className="badge badge-secondary gap-1">
                            {getLanguageFlag(user.nativeLanguage)}
                            Native: {capitialize(user.nativeLanguage)}
                          </span>
                        </div>
                      )}

                      {/* BIO */}

                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}

                      {/* SEND REQUEST BUTTON */}

                      <button
                        type="button"
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => sendRequestMutation(userId)}
                        disabled={hasRequestBeenSent || isSendingToThisUser}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4" />
                            Request Sent
                          </>
                        ) : isSendingToThisUser ? (
                          <>
                            <span className="loading loading-spinner loading-sm" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
