import React, { useEffect, useState } from "react";
import Layout from "../layout";
import FormTaglines from "../components/FormTaglines";
import Logout from "../components/Logout";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  getSupplies,
  clearErrors,
  deleteSupplies,
} from "../redux/action/supplies";
import AddSupplies from "../components/AddSupplies";
import { useAlert } from "react-alert";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { DELETE_USER_RESET } from "../redux/type/users";
import { Link } from "react-router-dom";

const Logistics = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [addSupplies, setAddSupplies] = useState(false);
  const [editSupplies, setEditSupplies] = useState("");
  const { supplies, error, loading, suppliesDeleted } = useSelector(
    (state) => state.supplies
  );

  useEffect(() => {
    dispatch(getSupplies(null));
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (suppliesDeleted) {
      alert.success("Supplies deleted!");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, suppliesDeleted, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout classname="home_container Logistic" title="Logistics">
      {addSupplies && (
        <AddSupplies
          addSupplies={addSupplies}
          setAddSupplies={setAddSupplies}
          editSupplies={editSupplies}
          setEditSupplies={setEditSupplies}
        />
      )}

      <div className="col-12">
        <div className="col-12 color2 align-items-start d-flex flex-row justify-content-between">
          <div className="w-100">
            <FormTaglines title="Supplies Management" />
          </div>
          <div className="d-flex w-50 gap-2">
            <Link
              to="/supplies"
              className="rounded-3 btn btn-primary rounded-3 border-0 f14 w-100 text-center color6 py-2 fw-bold px-3"
            >
              Request Supplies
            </Link>
            <button
              onClick={() => setAddSupplies(true)}
              className="rounded-3 btn-lg bg_color2 rounded-3 border-0 f14 w-100 text-center color1 py-2 fw-bold px-3"
            >
              Add Supplies
            </button>
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
                      const {
                        tagID,
                        description,
                        serialNumber,
                        quantity,
                        prixUnit,
                        purchaseDate,
                        depreciatedValue,
                        _id,
                      } = content;
                      return (
                        <tr key={i}>
                          <td className="color4">{tagID}</td>
                          <td title={description} className="color4">
                            <div className="elipses">{description}</div>
                          </td>
                          <td className="color4">{serialNumber}</td>
                          <td className="color4">{quantity}</td>
                          <td className="color4">{prixUnit}</td>
                          <td className="color4">{purchaseDate}</td>
                          <td className="color4">{depreciatedValue}</td>
                          <td className="color4">
                            <div className="d-flex align-items-center gap-1">
                              <button
                                onClick={() => {
                                  setEditSupplies(content);
                                  setAddSupplies(true);
                                }}
                                className="border-0 bg-transparent"
                              >
                                <BiEdit
                                  className="text-warning"
                                  fontSize={24}
                                />
                              </button>
                              <button
                                onClick={() => dispatch(deleteSupplies(_id))}
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
      </div>
    </Layout>
  );
};

export default Logistics;
