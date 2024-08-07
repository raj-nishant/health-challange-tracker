import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import start from "../assets/kid.png";
import LoginCard from "../components/auth/LoginCard";

const Auth: React.FC = () => {
  const user = localStorage.getItem("username");

  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="flex flex-col bg-orange-100 min-h-screen">
      <section className="flex justify-between w-3/4 mx-auto mt-12">
        <img
          src={start}
          className="w-[350px] h-[380px] animate-fadeInSlideUp"
          alt="Start"
        />
        <div className="flex flex-col justify-center w-3/5 gap-5">
          <h3 className="text-5xl font-medium text-gray-700 font-poppins animate-fadeInSlideUp">
            Health Tracking
          </h3>
          <p className="text-2xl font-light text-gray-600 font-poppins animate-fadeInSlideUp delay-500">
            Your Fitness Journey Starts Here
          </p>
        </div>
      </section>

      <LoginForm />

      <section className="flex flex-col items-center gap-12 p-8">
        <p className="text-4xl font-semibold text-gray-700 font-poppins text-center">
          Features of our application
        </p>
        <div className="flex gap-5">
          {[
            {
              id: 1,
              name: "Create Your Own Challenge.",
              desc: "Start by creating a new challenge with a custom title and description. Set your start and end dates, and define the frequency to track your progress effectively.",
            },
            {
              id: 2,
              name: "Set Challenge Frequency",
              desc: "Customize your challenge by defining how often you want to complete it, whether daily or weekly. Stay on track with your personalized schedule.",
            },
            {
              id: 3,
              name: "Track Completion Status.",
              desc: "Mark each day or week as completed or missed to keep an accurate record of your challenge. Stay motivated by monitoring your consistency.",
            },
            {
              id: 4,
              name: "Monitor Your Progress.",
              desc: "Display the progress of your challenge from start to finish. Visualize your achievements and identify areas for improvement as you work towards your goals.",
            },
          ].map((challenge) => (
            <LoginCard data={challenge} key={challenge.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Auth;
