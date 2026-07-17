import { CheckIcon, GlobeIcon, MapPinIcon, XIcon } from "lucide-react";
import { getLanguageFlag } from "../FriendCard";

const IncomingRequestCard = ({ request, onAccept, isPending }) => {
  const { sender } = request;

  return (
    <div className="card bg-base-200 shadow-sm hover:shadow-md transition-all">
      <div className="card-body">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* User Info */}

          <div className="flex gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={sender.profilePic} alt={sender.fullName} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">{sender.fullName}</h3>

              {sender.location && (
                <p className="text-sm opacity-70 flex items-center gap-1 mt-1">
                  <MapPinIcon className="size-4" />
                  {sender.location}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-3">
                {sender.nativeLanguage && (
                  <span className="badge badge-secondary">
                    {getLanguageFlag(sender.nativeLanguage)}
                    Native: {sender.nativeLanguage}
                  </span>
                )}

                {sender.learningLanguage && (
                  <span className="badge badge-outline">
                    <GlobeIcon className="size-3 mr-1" />
                    Learning: {sender.learningLanguage}
                  </span>
                )}
              </div>

              {sender.bio && (
                <p className="text-sm opacity-70 mt-3">{sender.bio}</p>
              )}
            </div>
          </div>

          {/* Buttons */}

          <div className="flex gap-2">
            <button
              className="btn btn-primary"
              disabled={isPending}
              onClick={() => onAccept(request._id)}
            >
              <CheckIcon className="size-4" />
              Accept
            </button>

            {/* Backend Later */}

            <button className="btn btn-outline btn-error" disabled>
              <XIcon className="size-4" />
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingRequestCard;
