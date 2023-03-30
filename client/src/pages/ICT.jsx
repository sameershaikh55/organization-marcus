import React, { useEffect, useState } from "react";
import Layout from "../layout";
import FormTaglines from "../components/FormTaglines";
import Logout from "../components/Logout";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getUsers, clearErrors, deleteUser } from "../redux/action/users";
import { useAlert } from "react-alert";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { DELETE_USER_RESET } from "../redux/type/users";
import UpdatePassword from "../components/UpdatePassword";
import UpdateRole from "../components/UpdateRole";
import UpdateStatus from "../components/UpdateStatus";
import { Link } from "react-router-dom";

const ICT = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [settings, setSettings] = useState("");
  const [moreSettings, setMoreSettings] = useState({
    type: "",
    id: "",
  });
  const { users, error, loading, userDeleted } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (userDeleted) {
      alert.success("User deleted!");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, userDeleted, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div onClick={() => settings && setSettings("")}>
      {moreSettings.type === "password" && (
        <UpdatePassword
          moreSettings={moreSettings}
          setMoreSettings={setMoreSettings}
        />
      )}
      {moreSettings.type === "role" && (
        <UpdateRole
          moreSettings={moreSettings}
          setMoreSettings={setMoreSettings}
        />
      )}
      {moreSettings.type === "status" && (
        <UpdateStatus
          moreSettings={moreSettings}
          setMoreSettings={setMoreSettings}
        />
      )}

      <Layout classname="home_container ICT" title="ICT">
        <div className="col-12">
          <div className="col-12 color2 align-items-start d-flex flex-row justify-content-between">
            <div className="w-100">
              <FormTaglines title="User Management" />
            </div>
            <div className="d-flex w-50 gap-2">
              <Link
                to="/supplies"
                className="rounded-3 btn btn-primary rounded-3 border-0 f14 w-100 text-center color6 py-2 fw-bold px-3"
              >
                Request Supplies
              </Link>
            </div>
          </div>
          <br />
          <div className="col-12">
            <div className="table-responsive">
              <div className="table-wrapper">
                <table className="table table-dark table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="color2">#</th>
                      <th className="color2">Title</th>
                      <th className="color2">Name</th>
                      <th className="color2">Email</th>
                      <th className="color2">Contract Date</th>
                      <th className="color2">Role</th>
                      <th className="color2">Status</th>
                      <th className="color2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(users.length &&
                      users.map((content, i) => {
                        const {
                          personalInformation: {
                            title,
                            email,
                            firstName,
                            lastName,
                          },
                          position: { contractEntryDate, role },
                          status,
                          _id,
                        } = content;
                        return (
                          <tr key={i}>
                            <td className="color4">{i + 1}</td>
                            <td className="color4">{title}</td>
                            <td className="color4">{firstName + lastName}</td>
                            <td className="color4">{email}</td>
                            <td className="color4">
                              {new Date(contractEntryDate).toDateString()}
                            </td>
                            <td className="color4">{role}</td>
                            <td
                              className={`status ${
                                (status === "notActive" && "text-warning") ||
                                "text-success-active"
                              } d-flex align-items-center gap-2`}
                            >
                              {(status === "notActive" && "Inactive") ||
                                "Active"}
                            </td>
                            <td className="color4">
                              <div className="d-flex align-items-center gap-1">
                                <div className="position-relative">
                                  <button
                                    onClick={() => {
                                      if (settings === _id) {
                                        setSettings("");
                                      } else {
                                        setSettings(_id);
                                      }
                                    }}
                                    className="border-0 bg-transparent"
                                  >
                                    <IoMdSettings
                                      className="color6"
                                      fontSize={24}
                                    />
                                  </button>
                                  {settings === _id && (
                                    <ul className="user_management_dropdown list-unstyled">
                                      <li
                                        onClick={() =>
                                          setMoreSettings({
                                            type: "password",
                                            id: _id,
                                          })
                                        }
                                        className="f12"
                                      >
                                        update password
                                      </li>
                                      <li
                                        onClick={() =>
                                          setMoreSettings({
                                            type: "role",
                                            id: _id,
                                          })
                                        }
                                        className="f12"
                                      >
                                        update role
                                      </li>
                                      <li
                                        onClick={() =>
                                          setMoreSettings({
                                            type: "status",
                                            id: _id,
                                          })
                                        }
                                        className="f12"
                                      >
                                        update status
                                      </li>
                                    </ul>
                                  )}
                                </div>
                                <button
                                  onClick={() => dispatch(deleteUser(_id))}
                                  className="border-0 bg-transparent"
                                >
                                  <RiDeleteBin2Fill
                                    className="text-danger"
                                    fontSize={24}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })) || (
                      <tr>
                        <td className="text-center" colSpan={6}>
                          no data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 text-end mt-4">
            <Logout />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ICT;
