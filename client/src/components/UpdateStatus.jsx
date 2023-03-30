import React, { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateUser, clearErrors } from "../redux/action/users";
import SmallLoader from "../components/SmallLoader";
import Checkbox from "../components/Selectbox";
import { UPDATE_USER_RESET } from "../redux/type/users";

const UpdateStatus = ({ moreSettings, setMoreSettings }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { userLoading, userError, success } = useSelector(
    (state) => state.users
  );

  const [statusHandle, setStatusHandle] = useState({
    status: "",
  });

  const handleChange = (e) => {
    setStatusHandle({ ...statusHandle, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const { status } = statusHandle;

    if (!status) {
      alert.error("Please select the field");
      return;
    }

    dispatch(updateUser(statusHandle, moreSettings.id));
  };

  useEffect(() => {
    if (userError) {
      alert.error(userError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Role Updated!");
      dispatch({ type: UPDATE_USER_RESET });
      setStatusHandle({
        status: "",
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

        <h2 className="text-center color2">Update Status</h2>

        <form onSubmit={submit} className="form_container pt-3">
          <div className="container-fluid">
            <div className="row gy-4">
              <Checkbox
                title="Status"
                name="status"
                options={["Active", "notActive"]}
                onchange={(e) => handleChange(e)}
                state={statusHandle.status}
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

export default UpdateStatus;
