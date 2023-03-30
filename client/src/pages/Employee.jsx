import React from "react";
import Layout from "../layout";
import FormTaglines from "../components/FormTaglines";
import Logout from "../components/Logout";
import { Link } from "react-router-dom";
import Socials from "../components/Socials";
import Menu from "../components/Menu";

const Employee = () => {
  return (
    <Layout classname="home_container Employee" title="Employee">
      <div className="d-flex justify-content-center bg_color1 w-100 py-3 rounded-3 border border-1 border-top-0 border-start-0 border-end-0 border-bottom-white">
        <Menu />
      </div>
      <hr />

      <div className="col-12">
        <div className="col-12 color2 align-items-center d-flex flex-row justify-content-between">
          <div className="w-100 text-center">
            <FormTaglines title="Employee" />
          </div>
        </div>
        <div className="row">
          <div className="col-5 mx-auto">
            <div className="d-flex gap-2 my-5">
              <Link
                to="/supplies"
                className="rounded-3 btn btn-primary rounded-3 border-0 f14 w-100 text-center color6 py-2 fw-bold px-3"
              >
                Request Supplies
              </Link>
              <button className="rounded-3 btn-lg bg_color2 rounded-3 border-0 f14 w-100 text-center color1 py-2 fw-bold">
                Add Projects
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 text-end mt-4">
          <Logout />
        </div>

        <div className="col-12 d-flex justify-content-center">
          <Socials />
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
