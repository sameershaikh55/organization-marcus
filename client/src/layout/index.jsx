import React, { Fragment } from "react";
import Metadata from "../components/Metadata";

const Layout = ({ children, classname, title }) => {
  return (
    <Fragment>
      <Metadata title={title} />

      <div className={classname}>
        <div className="page_container w-100">
          <div className="container-fluid">
            <div className="row gy-4">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
