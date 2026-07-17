import { Link, useLocation } from "react-router";

import useAuthUser from "../hooks/useAuthUser";
import { navigation } from "../constants/navigation";

const BottomNavigation = () => {
  const { pathname } = useLocation();
  const { authUser } = useAuthUser();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-base-300 bg-base-200/95 backdrop-blur-md lg:hidden">
      <div className="grid h-16 grid-cols-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-base-content/70 hover:text-primary"
              }`}
            >
              <Icon className={`size-5 ${isActive ? "scale-110" : ""}`} />

              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            pathname === "/profile"
              ? "text-primary"
              : "text-base-content/70 hover:text-primary"
          }`}
        >
          <div className="avatar">
            <div className="w-7 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100">
              <img
                src={authUser?.profilePic}
                alt={authUser?.fullName || "Profile"}
              />
            </div>
          </div>

          <span className="text-[11px] font-medium">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
