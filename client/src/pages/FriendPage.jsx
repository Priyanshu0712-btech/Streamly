import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { UsersIcon } from "lucide-react";

import { getUserFriends } from "../lib/api";

import FriendGrid from "../components/FriendGrid";
import FriendSkeleton from "../components/FriendSkeleton";
import EmptyFriends from "../components/EmptyFriends";

const FriendsPage = () => {
  const {
    data: friends = [],
    isLoading,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Your Friends
            </h1>

            <p className="text-base-content/70">
              Stay connected with your language partners.
            </p>
          </div>

          <Link
            to="/notifications"
            className="btn btn-outline"
          >
            <UsersIcon className="size-4" />
            Friend Requests
          </Link>

        </div>

        {isLoading ? (
          <FriendSkeleton />
        ) : friends.length === 0 ? (
          <EmptyFriends />
        ) : (
          <FriendGrid friends={friends} />
        )}

      </div>
    </div>
  );
};

export default FriendsPage;