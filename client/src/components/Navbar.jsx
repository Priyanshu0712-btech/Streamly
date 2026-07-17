import { Link } from "react-router";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  return (
    <nav className="sticky top-0 z-30 h-16 border-b border-base-300 bg-base-200 backdrop-blur">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile Logo */}

        <Link to="/" className="flex items-center gap-2 lg:hidden">
          <ShipWheelIcon className="size-8 text-primary" />

          <span className="text-xl font-bold font-mono bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Streamly
          </span>
        </Link>

        {/* Desktop Spacer */}

        <div className="hidden lg:block" />

        {/* Right Section */}

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/notifications" className="btn btn-ghost btn-circle">
            <BellIcon className="size-5" />
          </Link>

          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={authUser?.profilePic}
                alt={authUser?.fullName || "User"}
              />
            </div>
          </div>

          <button onClick={logoutMutation} className="btn btn-ghost btn-circle">
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;