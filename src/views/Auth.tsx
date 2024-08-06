import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { AuthContext } from "../contexts/AuthContext";

const Auth: React.FC = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);

  if (user?.username) return <Navigate to="/dashboard" />;

  return (
    <div className="landing min-h-screen bg-gray-800 flex flex-col items-center justify-center">
      <div className="dark-overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Health Tracking</h1>
        <h4 className="text-xl mb-8">Tracking what you are doing!</h4>
        <div className="flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
