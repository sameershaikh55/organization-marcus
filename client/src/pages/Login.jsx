import React, { Fragment, useEffect, useState } from "react";
import loginpng from "../assets/images/login.png";
import lock from "../assets/icons/lock.svg";
import Input from "../components/Input";
import Logo from "../components/Logo";
import Metadata from "../components/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { login, clearErrors } from "../redux/action/auth";
import SmallLoader from "../components/SmallLoader";
import Checkbox from "../components/Checkbox";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginHandle, setLoginHandle] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setLoginHandle({ ...loginHandle, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(loginHandle.email, loginHandle.password, loginHandle.role));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      alert.success("Login successfully");
    }
  }, [dispatch, alert, error, isAuthenticated]);

  return (
    <Fragment>
      <div className="login_container">
        <Metadata title="Login" />

        <div className="login-right">
          <img src={loginpng} alt="" />
          <h1 className="display-4 text-center">
            Organization
            <br />- Marcus S.A -
          </h1>
        </div>
        <div className="login-left">
          <form onSubmit={submit} className="inner-left d-flex flex-column">
            <div className="d-flex flex-column gap-3">
              <Logo />
              <br />
              <br />
              <Input
                label="Email Address"
                name="email"
                value={loginHandle.email}
                onChange={(e) => handleChange(e)}
              />
              <Input
                label="Password"
                icon={lock}
                name="password"
                value={loginHandle.password}
                onChange={(e) => handleChange(e)}
              />
              <Checkbox
                title="Role"
                name="role"
                options={["Employee", "Logistic", "Executive", "Admin", "ICT"]}
                onchange={(e) => handleChange(e)}
                state={loginHandle.role}
              />

              <div className="d-flex flex-column mt-4">
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className="rounded-3 btn-lg bg_color2 rounded-3 border-0 f18 w-100 text-center color1 py-2 fw-bold"
                >
                  {loading ? <SmallLoader /> : "Login"}
                </button>
              </div>
            </div>

            <p className="text-white f14">@2022 - All rights reserved</p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
