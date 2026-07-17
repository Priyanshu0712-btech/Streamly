import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex min-h-screen">
        {showSidebar && <Sidebar />}

        <div className="flex flex-1 flex-col min-w-0">
          <Navbar />

          <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
            {children}
          </main>

          {showSidebar && <BottomNavigation />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
