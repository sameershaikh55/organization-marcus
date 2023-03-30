import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Menu = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="d-flex gap-3">
      <Link
        className={`${
          isAuthenticated
            ? (location.pathname === "/" && "color10") || "text-white"
            : (location.pathname === "/login" && "color10") || "text-white"
        }`}
        to={`${(isAuthenticated && "/") || "/login"}`}
      >
        Home
      </Link>
      <Link
        className={`${
          (location.pathname === "/roles" && "color10") || "text-white"
        }`}
        to="/roles"
      >
        Roles
      </Link>
    </div>
  );
};

export default Menu;
