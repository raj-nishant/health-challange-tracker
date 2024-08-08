import React from "react";
import { Link } from "react-router-dom";

const NavbarMenu: React.FC = () => {
  const user: string | null = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("posts");
    window.location.reload();
  };

  return (
    <nav className="bg-[#ffeade] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-[#5a5a5a] font-semibold text-xl"
            >
              Dashboard
            </Link>
            <span className="ml-6 text-[#5a5a5a] font-semibold">
              Welcome {user}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-[#ff6b6b] hover:bg-[#ff4d4d] text-white font-semibold py-2 px-4 rounded z-10"
          >
            Logout & Clear
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMenu;
