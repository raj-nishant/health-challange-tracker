import React, { useState } from "react";
import logo from "../../assets/logo.png";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-between w-full h-20 px-4 py-2 border-b border-[#fefedc] ">
      <div className="flex items-center justify-baseline gap-2 cursor-pointer text-gray-800">
        <img src={logo} alt="" className="w-20 md:w-24" />
      </div>
    </div>
  );
};

export default NavBar;
