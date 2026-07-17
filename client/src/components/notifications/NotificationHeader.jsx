import { BellIcon } from "lucide-react";

const NotificationHeader = ({ requestCount }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <div className="flex items-center gap-3">
          <BellIcon className="size-7 text-primary" />

          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>

        <p className="text-base-content/70 mt-2">
          Stay updated with your friend requests and recent activity.
        </p>
      </div>

      <div className="badge badge-primary badge-lg">{requestCount} Pending</div>
    </div>
  );
};

export default NotificationHeader;
