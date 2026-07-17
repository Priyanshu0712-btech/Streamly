import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { acceptFriendRequest, rejectFriendRequest, getFriendRequests, } from "../lib/api";

import NotificationHeader from "../components/notifications/NotificationHeader";
import IncomingRequestCard from "../components/notifications/IncomingRequestCard";
import ActivityCard from "../components/notifications/ActivityCard";
import NotificationsSkeleton from "../components/notifications/NotificationsSkeleton";
import NoNotificationsFound from "../components/notifications/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  // Fetch all notifications
  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  // Accept Friend Request
  const { mutate: acceptRequest, isPending: isAccepting } = useMutation({
    mutationFn: acceptFriendRequest,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["friendRequests"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["friends"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["users"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["outgoingFriendReqs"],
        }),
      ]);
    },
  });

  // Reject Friend Request
  const { mutate: rejectRequest, isPending: isRejecting } = useMutation({
    mutationFn: rejectFriendRequest,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["friendRequests"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["users"],
        }),
      ]);
    },
  });

  const incomingRequests = data?.incomingReqs ?? [];
  const acceptedRequests = data?.acceptedReqs ?? [];

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <NotificationsSkeleton />
      </div>
    );
  }

  if (incomingRequests.length === 0 && acceptedRequests.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <NoNotificationsFound />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl">
        <NotificationHeader requestCount={incomingRequests.length} />

        {/* Incoming Friend Requests */}

        {incomingRequests.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>

            <div className="space-y-4">
              {incomingRequests.map((request) => (
                <IncomingRequestCard
                  key={request._id}
                  request={request}
                  onAccept={acceptRequest}
                  onReject={rejectRequest}
                  isPending={isAccepting || isRejecting}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recent Activity */}

        {acceptedRequests.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

            <div className="space-y-4">
              {acceptedRequests.map((notification) => (
                <ActivityCard
                  key={notification._id}
                  notification={notification}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
