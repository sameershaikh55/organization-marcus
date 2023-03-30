import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import lock from "../assets/icons/lock.svg";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateUser, clearErrors } from "../redux/action/users";
import SmallLoader from "../components/SmallLoader";
import { UPDATE_USER_RESET } from "../redux/type/users";

const UpdatePassword = ({ moreSettings, setMoreSettings }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { userLoading, userError, success } = useSelector(
    (state) => state.users
  );

  const fields = [
    {
      label: "Password",
      name: "password",
    },
    {
      label: "Confirm Password",
      name: "cpassword",
    },
  ];

  const [passwordHandle, setPasswordHandle] = useState({
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setPasswordHandle({ ...passwordHandle, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const { password, cpassword } = passwordHandle;

    if (password && cpassword && password !== cpassword) {
      alert.error("Password doesn't match");
      return;
    }

    delete passwordHandle.cpassword;
    dispatch(updateUser(passwordHandle, moreSettings.id));
  };

  useEffect(() => {
    if (userError) {
      alert.error(userError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated!");
      dispatch({ type: UPDATE_USER_RESET });
      setPasswordHandle({
        password: "",
        cpassword: "",
      });
      setMoreSettings({
        type: "",
        id: "",
      });
    }
  }, [dispatch, alert, success, userError]);

  return (
    <div
      style={{ transform: (moreSettings.type && "scale(1)") || "scale(0)" }}
      className="register_container align-items-center"
    >
      <div
        style={{ maxHeight: "100%", minHeight: "1px" }}
        className="inner_register_container"
      >
        <button
          onClick={() =>
            setMoreSettings({
              type: "",
              id: "",
            })
          }
          className="cross bg-transparent border-0 p-0"
        >
          <FaRegTimesCircle />
        </button>

        <h2 className="text-center color2">Update Password</h2>

        <form onSubmit={submit} className="form_container pt-3">
          <div className="container-fluid">
            <div className="row gy-4">
              {fields.map((content, idx) => {
                return (
                  <div key={idx} className="col-12">
                    <Input
                      label={content.label}
                      icon={
                        content.label === "Password" ||
                        content.label === "Confirm Password"
                          ? lock
                          : ""
                      }
                      name={content.name}
                      value={passwordHandle[content.name]}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                );
              })}

              <div className="col-12">
                <button
                  disabled={(userLoading && true) || false}
                  type="submit"
                  className="rounded-3 btn-lg bg_color2 rounded-3 border-0 f18 w-100 text-center color1 py-2 fw-bold"
                >
                  {(userLoading && <SmallLoader />) || "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
