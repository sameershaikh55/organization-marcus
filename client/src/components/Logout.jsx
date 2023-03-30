import React from "react";
import { logout } from "../redux/action/auth";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="btn btn-danger f14"
      onClick={() => dispatch(logout())}
    >
      &#8592; logout
    </button>
  );
};

export default Logout;
