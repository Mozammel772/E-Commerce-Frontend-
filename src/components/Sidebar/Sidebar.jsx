import { Home, HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FaChartLine,
  FaCrown,
  FaHistory,
  FaPaintBrush,
  FaPoll,
  FaTools,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiLogout, HiX } from "react-icons/hi";
import { MdSchool } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Sidebar = ({ isSidebarOpen, handleSidebarToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logOut, user } = useAuth();
  const { role } = useRole();
  const [openDropdown, setOpenDropdown] = useState(null);

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    const allMenuItems = role === "admin" ? adminMenuItems : userMenuItems;
    const activeMenu = allMenuItems.find((item) =>
      item.subItems?.some((sub) => isActive(sub.path))
    );
    if (activeMenu) {
      setOpenDropdown(activeMenu.label);
    }
  }, [location.pathname, role]);

  const MenuItem = ({ item, onClick, level = 0 }) => {
    const isMenuActive = isActive(item.path);
    const isDropdownOpen = openDropdown === item.label;
    const indentClass = level === 1 ? "ml-4" : "";

    return (
      <li className="group w-full flex-shrink-0">
        <div
          className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer select-none w-full ${
            isMenuActive
              ? "bg-orange-200 text-black shadow-md"
              : "text-black hover:bg-orange-200 hover:text-orange-800"
          } ${indentClass}`}
          onClick={() => {
            if (item.subItems) {
              toggleDropdown(item.label);
            } else {
              onClick(item.path);
            }
          }}
        >
          {isMenuActive && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-orange-600 rounded-r-full"></div>
          )}

          <div className="flex-shrink-0">
            <item.icon className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{item.label}</div>
            {item.description && (
              <div className="text-xs text-orange-600 group-hover:text-orange-700">
                {item.description}
              </div>
            )}
          </div>

          {item.subItems && (
            <div className="flex-shrink-0 text-orange-600 group-hover:text-orange-800 transition-transform duration-200">
              {isDropdownOpen ? (
                <FiChevronUp className="w-5 h-5" />
              ) : (
                <FiChevronDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>

        {item.subItems && isDropdownOpen && (
          <ul className="mt-1 space-y-1 w-full">
            {item.subItems.map((sub) => {
              const isSubActive = isActive(sub.path);
              return (
                <div
                  className={isSubActive ? "w-[90%]" : "w-full"}
                  key={sub.path}
                >
                  <MenuItem item={sub} onClick={onClick} level={level + 1} />
                </div>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  const adminMenuItems = [
    // {
    //   path: "/admin-dashboard",
    //   icon: MdDashboard,
    //   label: "Dashboard",
    //   description: "Overview & Analytics",
    // },
    {
      path: "/admin-dashboard",
      icon: FaPoll,
      label: "Pending Post",
      description: "Post Management",
    },
    {
      path: "/admin-dashboard/manage-users/all-users",
      icon: FaUsers,
      label: "Manage Users",
      description: "User Management",
    },
    {
      path: "/admin-dashboard/request-a-quote",
      icon: FaPaintBrush,
      label: "Request A Quote",
      description: "Problem Solving",
    },
    {
      path: "/admin-dashboard/on-site-visits",
      icon: FaPaintBrush,
      label: "On-Site-Visits",
      description: "Problem Solving",
    },
  ];

  const userMenuItems = [
    {
      path: "/user-dashboard",
      icon: FaTools,
      label: "Work Post",
      description: "Your Work Post",
    },
    {
      path: "/user-dashboard/my-post-history",
      icon: FaTools,
      label: "Post History",
      description: "My Post History",
    },
    {
      path: "/user-dashboard/create-a-quote-requsted",
      icon: FaPaintBrush,
      label: "Request A Quote",
      description: "Problem Solving",
    },
    {
      path: "/history",
      icon: FaHistory,
      label: "History",
      description: "Activity Log",
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    handleSidebarToggle();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-orange-950/80 backdrop-blur-sm z-[999] lg:hidden"
          onClick={handleSidebarToggle}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 bg-orange-50 border-r border-orange-100 min-h-screen shadow-2xl w-64 h-full overflow-y-auto transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out lg:translate-x-0 z-[1000]`}
      >
        <div className="sticky top-0 z-10 bg-orange-100/90 border-b border-orange-200">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  {role === "admin" ? (
                    <FaCrown className="w-5 h-5 text-white" />
                  ) : (
                    <FaUserShield className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-orange-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-black font-bold text-lg leading-tight">
                  {role === "admin" ? "Admin Panel" : "User Panel"}
                </h1>
                <p className="text-orange-700 text-xs">
                  {role === "admin"
                    ? "Management Console"
                    : "Construction Dashboard"}
                </p>
              </div>
            </div>
            <button
              className="lg:hidden p-2 text-orange-700 hover:text-black hover:bg-orange-200 rounded-lg transition-all duration-200"
              onClick={handleSidebarToggle}
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {role === "admin" ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs font-semibold text-orange-800 uppercase tracking-wider">
                  Administration
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-300 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {adminMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MdSchool className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs font-semibold text-orange-800 uppercase tracking-wider">
                  Construction
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-300 to-transparent"></div>
              </div>
              <ul className="space-y-2">
                {userMenuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    onClick={handleMenuClick}
                  />
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-4 h-4 text-orange-600" />
              <h3 className="text-xs font-semibold text-orange-800 uppercase tracking-wider">
                Home
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-300 to-transparent"></div>
            </div>
            <ul className="space-y-2">
              <MenuItem
                item={{
                  path: "/",
                  icon: HomeIcon,
                  label: "Home",
                  description: "Go To Home",
                }}
                onClick={handleMenuClick}
              />
            </ul>
          </div>
          {/* <div>
            <div className="flex items-center gap-2 mb-4">
              <CgProfile className="w-4 h-4 text-orange-600" />
              <h3 className="text-xs font-semibold text-orange-800 uppercase tracking-wider">
                Account
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-300 to-transparent"></div>
            </div>
            <ul className="space-y-2">
              <MenuItem
                item={{
                  path:
                    role === "admin"
                      ? "/admin-dashboard/my-profile"
                      : "/user-dashboard/my-profile",
                  icon: CgProfile,
                  label: role === "admin" ? " Profile" : " Profile",
                  description:
                    role === "admin" ? "Admin Settings" : "Personal Settings",
                }}
                onClick={handleMenuClick}
              />
            </ul>
          </div> */}

          <div className="border-t border-orange-200 pt-4">
            <button
              onClick={logOut}
              className="group flex items-center gap-3 p-3 w-full text-left rounded-xl transition-all duration-300 text-orange-800 hover:bg-orange-200 hover:text-orange-900 border border-transparent hover:border-orange-400"
            >
              <HiLogout className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <div className="flex-1">
                <div className="font-medium text-sm">Sign Out</div>
                <div className="text-xs text-orange-600 group-hover:text-orange-700">
                  End your session
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
