import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";

const UserLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="navbar bg-base-100 shadow-2xl w-full flex justify-between items-center fixed top-0 left-0 z-[100] h-16">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden bg-orange-100 rounded-md px-3 py-2 hover:bg-orange-200 cursor-pointer"
              onClick={handleSidebarToggle}
            >
              <HiMenuAlt1 className="w-7 h-7 text-orange-600" />
            </button>
          </div>
        </div>

        {/* Outlet/Main Content */}
        <div className="flex-1 overflow-y-auto px-3 lg:px-8 pt-16 lg:ml-56 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
