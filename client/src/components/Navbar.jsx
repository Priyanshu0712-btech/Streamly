import { Link } from "react-router";
import { LogOutIcon, ShipWheelIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-200/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 lg:hidden">
          <ShipWheelIcon className="size-8 text-primary" />

          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl font-bold font-mono text-transparent">
            Streamly
          </span>
        </Link>

        <div className="hidden lg:block" />

        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img
                src={authUser?.profilePic}
                alt={authUser?.fullName || "User"}
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <h2 className="font-semibold leading-none">{authUser?.fullName}</h2>

            <p className="text-sm text-success">Online</p>
          </div>

          <button
            onClick={logoutMutation}
            className="btn btn-ghost btn-circle"
            aria-label="Logout"
          >
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
