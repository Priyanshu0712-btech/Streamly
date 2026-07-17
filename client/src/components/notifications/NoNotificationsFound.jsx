import { BellIcon } from "lucide-react";

const NoNotificationsFound = () => {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="card bg-base-200">
        <div className="card-body py-20 items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <BellIcon className="size-10 text-primary" />
          </div>

          <h2 className="text-2xl font-bold">You're all caught up!</h2>

          <p className="mt-3 max-w-md opacity-70">
            You don't have any friend requests or recent activity right now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoNotificationsFound;
