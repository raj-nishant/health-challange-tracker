import React from "react";

interface Challenge {
  id: number;
  name: string;
  desc: string;
}

interface LoginCard {
  data: Challenge;
}

const LoginCard: React.FC<LoginCard> = ({ data }) => {
  return (
    <div className="flex flex-col items-center gap-2 bg-white rounded-md shadow-md p-4 w-full md:w-1/4 hover:shadow-lg transform transition-transform duration-200 cursor-pointer">
      <span className="text-lg font-semibold text-gray-800 text-center">
        {data.name}
      </span>
      <p className="text-sm font-light text-gray-600 text-center">
        {data.desc}
      </p>
    </div>
  );
};

export default LoginCard;
