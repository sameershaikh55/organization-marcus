import React, { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateUser, clearErrors } from "../redux/action/users";
import SmallLoader from "../components/SmallLoader";
import Checkbox from "../components/Checkbox";
import { UPDATE_USER_RESET } from "../redux/type/users";

const UpdateRole = ({ moreSettings, setMoreSettings }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { userLoading, userError, success } = useSelector(
    (state) => state.users
  );

  const [roleHandle, setRoleHandle] = useState({
    role: "",
  });

  const handleChange = (e) => {
    setRoleHandle({ ...roleHandle, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const { role } = roleHandle;

    if (!role) {
      alert.error("Please select the field");
      return;
    }

    dispatch(updateUser(roleHandle, moreSettings.id));
  };

  useEffect(() => {
    if (userError) {
      alert.error(userError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Role Updated!");
      dispatch({ type: UPDATE_USER_RESET });
      setRoleHandle({
        role: "",
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
        style={{
          maxHeight: "100%",
          minHeight: "1px",
          minWidth: "300px",
          overflowY: "initial",
        }}
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

        <h2 className="text-center color2">Update Role</h2>

        <form onSubmit={submit} className="form_container pt-3">
          <div className="container-fluid">
            <div className="row gy-4">
              <Checkbox
                title="Role"
                name="role"
                options={["Employee", "Logistic", "Executive"]}
                onchange={(e) => handleChange(e)}
                state={roleHandle.role}
              />

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

export default UpdateRole;
