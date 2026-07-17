import { Link, useLocation } from "react-router";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const { pathname } = useLocation();

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      label: "Friends",
      path: "/friends",
      icon: UsersIcon,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: BellIcon,
    },
  ];

  return (
    <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col border-r border-base-300 bg-base-200 sticky top-0 h-screen">

      <div className="p-6 border-b border-base-300">
        <Link to="/" className="flex items-center gap-3">
          <ShipWheelIcon className="size-9 text-primary" />

          <span className="text-3xl font-bold font-mono bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
            Streamly
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`btn btn-ghost w-full justify-start gap-3 normal-case ${
                pathname === item.path ? "btn-active" : ""
              }`}
            >
              <Icon className="size-5" />

              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-base-300 p-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-11 rounded-full">
              <img src={authUser?.profilePic} alt={authUser?.fullName} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold">{authUser?.fullName}</h3>

            <p className="text-success text-sm flex items-center gap-2">
              <span className="size-2 rounded-full bg-success"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
