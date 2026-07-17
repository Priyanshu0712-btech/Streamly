import { Link, useLocation } from "react-router";
import { ShipWheelIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";
import { sidebarNavigation } from "../constants/navigation";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { authUser } = useAuthUser();

  return (
    <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col border-r border-base-300 bg-base-200 sticky top-0 h-screen">
      <div className="border-b border-base-300 px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <ShipWheelIcon className="size-9 text-primary" />

          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-bold font-mono tracking-wide text-transparent">
            Streamly
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {sidebarNavigation.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.path;

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`btn w-full justify-start gap-3 normal-case transition-all duration-200 ${
                    isActive ? "btn-primary" : "btn-ghost hover:bg-base-300"
                  }`}
                >
                  <Icon className="size-5" />

                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-base-300 p-4">
        <Link
          to="/profile"
          className="block cursor-pointer rounded-xl bg-base-100 p-3 transition-all duration-200 hover:scale-[1.02] hover:bg-base-300 hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  src={authUser?.profilePic}
                  alt={authUser?.fullName || "User"}
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold">{authUser?.fullName}</h2>

              <p className="flex items-center gap-2 text-sm text-success">
                <span className="inline-block h-2 w-2 rounded-full bg-success"></span>
                Online
              </p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
