import React from "react";
import logo from "../assets/images/logo.png";

const Logo = () => {
  return (
    <div className="text-white h2 fw-bold">
      <div className="logo-container">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Logo;
