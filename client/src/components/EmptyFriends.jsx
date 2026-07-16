import { UsersIcon } from "lucide-react";

const EmptyFriends = () => {
  return (
    <div className="card bg-base-200 p-10 text-center">

      <UsersIcon className="size-16 mx-auto text-base-content/30 mb-4" />

      <h2 className="text-xl font-semibold">
        No Friends Yet
      </h2>

      <p className="text-base-content/70 mt-2">
        Start sending friend requests to connect with people.
      </p>

    </div>
  );
};

export default EmptyFriends;