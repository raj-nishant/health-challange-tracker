import React from "react";
import { Link } from "react-router-dom";

const NavbarMenu: React.FC = () => {
  const user: string | null = localStorage.getItem("username");

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
        </div>
      </div>
    </nav>
  );
};

export default NavbarMenu;
