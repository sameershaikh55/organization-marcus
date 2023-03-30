import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loading_page">
      <div className="inner_loading">
        <HashLoader size={80} color="#f0e8de" />
      </div>
    </div>
  );
};

export default Loader;
