import { CheckCircleIcon, ClockIcon, MessageCircleIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ActivityCard = ({ notification }) => {
  const { recipient } = notification;

  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body">
        <div className="flex items-start gap-4">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src={recipient.profilePic} alt={recipient.fullName} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{recipient.fullName}</h3>

            <p className="mt-1 text-sm opacity-80">
              accepted your friend request.
            </p>

            <div className="mt-3 flex items-center gap-4 text-xs opacity-70">
              <span className="flex items-center gap-1">
                <ClockIcon className="size-3" />
                {formatDistanceToNow(new Date(notification.updatedAt), {
                  addSuffix: true,
                })}
              </span>

              <span className="badge badge-success">
                <MessageCircleIcon className="size-3 mr-1" />
                New Friend
              </span>
            </div>
          </div>

          <CheckCircleIcon className="size-7 text-success" />
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
