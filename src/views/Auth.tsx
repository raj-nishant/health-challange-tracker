import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import style from "./Auth.module.css";
import start from "../assets/kid.png";
import LoginCard from "../components/auth/LoginCard";

const Auth: React.FC = () => {
  const user = localStorage.getItem("username");

  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className={style.container}>
      <section className={style.start}>
        <img src={start} className={style.mainimage} alt="Start" />
        <div className={style.startcontent}>
          <h3>Health Tracking</h3>
          <p>Your Fitness Journey Starts Here</p>
        </div>
      </section>

      <LoginForm />
      <br />
      <br />
      <section className={style.challengesoptions}>
        <p>Features of our application</p>
        <div className={style.challengeoption}>
          {[
            {
              id: 1,
              name: "Create Your Own Challenge.",
              desc: "Start by creating a new challenge with a custom title and description. Set your start and end dates, and define the frequency to track your progress effectively.",
              // imgSrc: running,
            },
            {
              id: 2,
              name: "Set Challenge Frequency",
              desc: "Customize your challenge by defining how often you want to complete it, whether daily or weekly. Stay on track with your personalized schedule.",
              // imgSrc: diet,
            },
            {
              id: 3,
              name: "Track Completion Status.",
              desc: "Mark each day or week as completed or missed to keep an accurate record of your challenge. Stay motivated by monitoring your consistency.",
              // imgSrc: book,
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
