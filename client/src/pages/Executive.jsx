import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { FaFileImport } from "react-icons/fa";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logout } from "../redux/action/auth";
import Layout from "../layout";
import { useAlert } from "react-alert";

const Executives = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, isAuthenticated, error } = useSelector((state) => state.user);

  const homeNavigation = [
    {
      title: "Coming projects",
      icon: <AiFillFileAdd fontSize={50} className="color3" />,
      link: "/",
    },
    {
      title: "Complete projects",
      icon: <BsFillFileEarmarkCheckFill fontSize={50} className="color3" />,
      link: "/",
    },
    {
      title: "Ongoing projects",
      icon: <FaFileImport fontSize={50} className="color3" />,
      link: "/",
    },
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated === false) {
      alert.success("Logout successfully");
    }
  }, [dispatch, alert, isAuthenticated]);

  return (
    <Layout classname="home_container Executive" title="Executive">
      <div className="col-12 col-md-5">
        <div className="d-flex flex-column align-items-center">
          <div>
            <FaUser
              fontSize={(window.screen.width < 768 && 150) || 250}
              className="color2"
            />
          </div>
          <h6 className="text-center color2 mt-3 mb-0"> {user.email} </h6>
          <button
            onClick={() => dispatch(logout())}
            className="text-center color2 bg-transparent border-0 color7 h-100"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="col-12 col-md-7">
        <div className="container-fluid px-4 px-md-0">
          <div className="row gy-4">
            {homeNavigation.map((content, idx) => {
              return (
                <div key={idx} className="col-12 navigation">
                  <Link to={content.link}>
                    <div className="row">
                      <div className="col-2 icon d-flex justify-content-center align-items-center">
                        {content.icon}
                      </div>
                      <div className="col-10 content d-flex flex-column justify-content-center">
                        <h2 className="mb-0 color2">{content.title}</h2>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Executives;
