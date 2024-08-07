import React, { useState } from "react";
// import arm from "../../assets/arm.png";
import navbar from "../../assets/navbar.png";
import style from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const matchRoute = (route: string): boolean => {
    return route === location.pathname;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={style.container}>
      <h3 className={style.heading}>
        <img src={logo} alt="" />
      </h3>
      {/* <div
        className={`${style.navlink} ${
          isMobileMenuOpen ? style.mobileMenuOpen : ""
        }`}
      >
        <Link
          to="/"
          style={matchRoute("/") ? { color: "rgb(239, 113, 55)" } : undefined}
          onClick={closeMobileMenu}
        >
          <span>Home</span>
        </Link>
        <Link
          to="/challenges"
          style={
            matchRoute("/challenges")
              ? { color: "rgb(239, 113, 55)" }
              : undefined
          }
          onClick={closeMobileMenu}
        >
          <span>Challenges</span>
        </Link>
        <Link
          to="/workouts"
          style={
            matchRoute("/workouts") ? { color: "rgb(239, 113, 55)" } : undefined
          }
          onClick={closeMobileMenu}
        >
          <span>Workouts</span>
        </Link>
      </div> */}
      <button className={style.hamburger} onClick={toggleMobileMenu}>
        <img src={navbar} alt="Open Menu" className={style.navbarImage} />
      </button>
    </div>
  );
};

export default NavBar;
