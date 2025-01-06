import React, { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Use the hook instead of the provider
import friend from "../assets/sidebar/friend.svg";
import Link from "../assets/sidebar/request.svg";
import Support from "../assets/sidebar/suggested.svg";
import logo from "../assets/twitterx.svg";
import profile from "../assets/sidebar/profile.png";
import search from "../assets/sidebar/search.svg";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser, user, isOpen, setIsOpen, setIsOpenProfile } = useUser(); // Using the hook here
  const sidebarRef = useRef(null);
  console.log("this is user", user);

  const menuItems = [
    // { icon: Dashboard, label: "dashboard", path: "/dashboard" },
    {
      icon: search,
      label: "Search People",
      path: "/Search",
      className: "md:hidden", // Hidden on medium screens and larger
    },
    { icon: friend, label: "My Friend", path: "/friendlist" },
    { icon: Link, label: "Request", path: "/friend-requests" },
    {
      icon: Support,
      label: "Suggestions",
      path: "/FriendRecommendations",
    },
    { icon: Link, label: "Logout", action: "logout" },
  ];

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await logoutUser();
      navigate("/login");
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="z-50" onClick={() => setIsOpenProfile(false)}>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full lg:w-[15%] md:w-[22%] w-52 bg-[#2a2a2a] border-r transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="border-r-[0.5px] border-[#bababa] text-[#ADB5BD] h-full flex flex-col">
          <div className="w-fit mx-auto">
            <div className="flex justify-between ml-1 mt-6 ">
              <img className="w-10 text-white" src={logo} alt="logo" />
            </div>
            <div className="space-y-4 mt-16">
              <ul className="menu-list max-w-fit mt-5">
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.label === "Setting" && (
                      <hr className="border-t- border-opacity-40 mt-5 border-gray-400 my-2" />
                    )}
                    <li
                      className={`menu-item flex items-center px-4 py-[.8rem] mt-2 cursor-pointer transition-all ${
                        location.pathname === item.path
                          ? "border-l-[3px] rounded-r-md border-green-500 hover:bg-[#3f3f3f]"
                          : "rounded-md hover:bg-[#3f3f3f]"
                      } ${item.className || ""}`} // Add className here
                      onClick={() => {
                        if (item.action === "logout") {
                          handleLogout(); // Call handleLogout if the action is logout
                        } else {
                          navigate(item.path);
                          setIsOpen(false);
                        }
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-[1.3rem]  mr-2"
                      />
                      <span className="font-medium text-[17px]">
                        {item.label}
                      </span>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto bg-[#252525]">
            <hr className="border-t border-[#ADB5BD] mb-1" />
            <div className="w-fit ml-[1rem] space-y-4 py-5">
              {/* User Profile Section */}
              <div className="flex items-center space-x-3">
                {/* Profile Icon */}
                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                  {/* Replace with user's avatar image or a fallback avatar */}
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Username */}
                <p className="font-medium text-white text-sm">
                  {user?.user?.username || "Username"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
