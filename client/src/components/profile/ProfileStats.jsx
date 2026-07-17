import { CalendarIcon, UserCheckIcon, UsersIcon } from "lucide-react";

const ProfileStats = ({ user }) => {
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Recently";

  const stats = [
    {
      icon: UsersIcon,
      label: "Friends",
      value: user?.friends?.length || 0,
    },
    {
      icon: UserCheckIcon,
      label: "Status",
      value: user?.isOnboarded ? "Active" : "Pending",
    },
    {
      icon: CalendarIcon,
      label: "Joined",
      value: joinedDate,
    },
  ];

  return (
    <div className="card bg-base-200 border border-base-300 shadow-md">
      <div className="card-body">
        <h2 className="card-title mb-4">Account Statistics</h2>

        <div className="space-y-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-base-100 p-3"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-primary" />

                  <span>{stat.label}</span>
                </div>

                <span className="font-semibold">{stat.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
