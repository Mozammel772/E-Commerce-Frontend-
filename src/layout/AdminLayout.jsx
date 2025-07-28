"use client";

import { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logOut, user } = useAuth();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex bg-gray-900 min-h-screen">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-[90] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white border-b border-orange-600 w-full flex justify-between items-center fixed top-0 left-0 z-[100] h-16 px-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden bg-orange-100 rounded-md px-3 py-2 hover:bg-orange-200 cursor-pointer"
              onClick={handleSidebarToggle}
            >
              <HiMenuAlt1 className="w-7 h-7 text-orange-600" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 pt-16 lg:ml-64 transition-all duration-300 ease-in-out bg-white">
          {/* Page Content */}
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl border border-orange-700 min-h-[calc(100vh-8rem)]">
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-orange-50 mt-auto py-4 px-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Admin Dashboard - Built with CARE ❤️
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
