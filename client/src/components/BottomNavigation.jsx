import { Link, useLocation } from "react-router";
import { bottomNavigation } from "../constants/navigation";

const BottomNavigation = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-base-300 bg-base-200/95 backdrop-blur-md lg:hidden">
      <div className="grid h-16 grid-cols-4">
        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                active
                  ? "text-primary"
                  : "text-base-content/70 hover:text-primary"
              }`}
            >
              <Icon className={`size-5 ${active ? "scale-110" : ""}`} />

              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
