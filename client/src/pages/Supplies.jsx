import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout";
import FormTaglines from "../components/FormTaglines";
import Logout from "../components/Logout";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getSupplies,
  deleteRequest,
  approveRequest,
} from "../redux/action/supplies";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  APPROVE_SUPPLIES_RESET,
  CREATE_REQUEST_SUPPLIES_RESET,
  DELETE_REQUEST_RESET,
} from "../redux/type/supplies";
import { FaCheck } from "react-icons/fa";
import RequestSuppliesBodyRow from "../components/RequestSuppliesBodyRow";
import Socials from "../components/Socials";
import Menu from "../components/Menu";

const Supplies = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const {
    error,
    loading,
    supplies,
    requests,
    requestSuccess,
    requestDeleted,
    requestApproveSuccess,
  } = useSelector((state) => state.supplies);

  useEffect(() => {
    dispatch(getSupplies(user.role));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (requestSuccess) {
      alert.success("Request submitted!");
      dispatch({ type: CREATE_REQUEST_SUPPLIES_RESET });
    }

    if (requestApproveSuccess) {
      alert.success("Request Approved!");
      dispatch({ type: APPROVE_SUPPLIES_RESET });
    }

    if (requestDeleted) {
      alert.success("Request Deleted!");
      dispatch({ type: DELETE_REQUEST_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    requestApproveSuccess,
    requestSuccess,
    requestDeleted,
  ]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout classname={`home_container ${user.role}`} title={user.role}>
      <div className="d-flex justify-content-center bg_color1 w-100 py-3 rounded-3 border border-1 border-top-0 border-start-0 border-end-0 border-bottom-white">
        <Menu />
      </div>
      <hr />

      <div className="col-12 py-5">
        <div className="col-12 color2 align-items-start d-flex flex-row justify-content-between">
          <div className="w-100">
            <FormTaglines title="Supplies" />
          </div>
          <div className="d-flex w-50 gap-2">
            <Link
              to="/"
              className="rounded-3 btn btn-primary rounded-3 border-0 f14 w-100 text-center color6 py-2 fw-bold"
            >
              go back
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
                    <th className="color2">Tag ID</th>
                    <th className="color2">Description</th>
                    <th className="color2">Serial Number</th>
                    <th className="color2">Quantity</th>
                    <th className="color2">Prix Unit</th>
                    <th className="color2">Purchase Date</th>
                    <th className="color2">Depreciated Value</th>
                    <th className="color2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(supplies.length &&
                    supplies.map((content, i) => {
                      return <RequestSuppliesBodyRow {...content} />;
                    })) || (
                    <tr>
                      <td className="text-center" colSpan={8}>
                        no data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 color2 align-items-center d-flex flex-row justify-content-between">
          <div className="w-100">
            <FormTaglines title="Pending Requests" />
          </div>
        </div>
        <br />
        <div className="col-12">
          <div className="table-responsive">
            <div className="table-wrapper">
              <table className="table table-dark table-striped table-hover">
                <thead>
                  <tr>
                    <th className="color2">Tag ID</th>
                    <th className="color2">Description</th>
                    <th className="color2">Serial Number</th>
                    <th className="color2">Requested By</th>
                    <th className="color2">Requested Quantity</th>
                    <th className="color2">Requested Date</th>
                    <th className="color2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(requests.length &&
                    requests.map((content, i) => {
                      const {
                        requestedQuantity,
                        supplies: { tagID, description, serialNumber },
                        user: { role, email },
                        createdAt,
                        _id,
                      } = content;

                      const date = new Date(createdAt).toLocaleDateString();

                      return (
                        <tr key={i}>
                          <td className="color4">{tagID}</td>
                          <td title={description} className="color4">
                            <div className="elipses">{description}</div>
                          </td>
                          <td className="color4">{serialNumber}</td>
                          <td className="color4">
                            {email}
                            <br />
                            Role: {role}
                          </td>
                          <td className="text-warning fw700">
                            {requestedQuantity}
                          </td>
                          <td className="color4">{date}</td>
                          <td className="color4">
                            <div className="d-flex gap-2 align-items-center">
                              <button
                                onClick={() => dispatch(deleteRequest(_id))}
                                className="border-0 bg-transparent"
                              >
                                <RiDeleteBin2Fill
                                  className="text-danger"
                                  fontSize={24}
                                />
                              </button>

                              {user.role === "Executive" && (
                                <button
                                  onClick={() => dispatch(approveRequest(_id))}
                                  className="border-0 bg-transparent"
                                >
                                  <FaCheck
                                    className="text-success"
                                    fontSize={24}
                                  />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })) || (
                    <tr>
                      <td className="text-center" colSpan={8}>
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

        <div className="col-12 d-flex justify-content-center">
          <Socials />
        </div>
      </div>
    </Layout>
  );
};

export default Supplies;
