import { CalendarIcon, CheckCircleIcon, MailIcon } from "lucide-react";

const ProfileHeader = ({ user }) => {
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="card bg-base-200 shadow-md border border-base-300">
      <div className="card-body">
        <div className="flex flex-col items-center gap-6 md:flex-row">

          <div className="relative">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100">
                <img src={user?.profilePic} alt={user?.fullName} />
              </div>
            </div>

            <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-base-200 bg-success"></span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <h1 className="text-3xl font-bold">{user?.fullName}</h1>

              {user?.isOnboarded && (
                <span className="badge badge-success gap-1 self-center md:self-auto">
                  <CheckCircleIcon className="size-4" />
                  Verified
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <p className="flex items-center justify-center gap-2 text-base-content/70 md:justify-start">
                <MailIcon className="size-4" />

                {user?.email}
              </p>

              <p className="flex items-center justify-center gap-2 text-base-content/70 md:justify-start">
                <CalendarIcon className="size-4" />
                Joined {joinedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
