import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

import NotificationsSkeleton from "../components/notifications/NotificationsSkeleton";
import NoNotificationsFound from "../components/notifications/NoNotificationsFound";

const NotificationsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
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

  if (
    incomingRequests.length === 0 &&
    acceptedRequests.length === 0
  ) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <NoNotificationsFound />
      </div>
    );
  }


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Notifications</h1>

        <p className="text-base-content/70 mt-2">
          Stay updated with your friend requests and activities.
        </p>
        <p>{incomingRequests.length}</p>
      </div>
    </div>
  );
};

export default NotificationsPage;
