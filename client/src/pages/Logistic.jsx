import React, { useEffect, useRef, useState } from "react";
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
import { RiFileExcel2Fill } from "react-icons/ri";
import Checkbox from "../components/Checkbox";
import { exportToExcel } from "../utils/exportXLS";
import Socials from "../components/Socials";
import Menu from "../components/Menu";

const Logistics = () => {
  const tableRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);

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

  function handleRowSelect(id) {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  }

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
      <div className="d-flex justify-content-center bg_color1 w-100 py-3 rounded-3 border border-1 border-top-0 border-start-0 border-end-0 border-bottom-white">
        <Menu />
      </div>
      <hr />

      {/* table to export */}
      <table className="d-none" ref={tableRef}>
        <thead>
          <tr>
            <th>Tag ID</th>
            <th>Description</th>
            <th>Serial Number</th>
            <th>Quantity</th>
            <th>Prix Unit</th>
            <th>Purchase Date</th>
            <th>Depreciated Value</th>
          </tr>
        </thead>
        <tbody>
          {supplies.length &&
            supplies.map((row, index) => {
              const {
                tagID,
                description,
                serialNumber,
                quantity,
                prixUnit,
                purchaseDate,
                depreciatedValue,
              } = row;

              if (selectedRows.includes(row._id)) {
                return (
                  <tr key={index}>
                    <td>{tagID}</td>
                    <td>{description}</td>
                    <td>{serialNumber}</td>
                    <td>{quantity}</td>
                    <td>{prixUnit}</td>
                    <td>{purchaseDate}</td>
                    <td>{depreciatedValue}</td>
                  </tr>
                );
              }
            })}
        </tbody>
        {/* Render table rows and columns from data props */}
      </table>
      {/* table to export */}

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
            <button
              disabled={!selectedRows.length ? true : false}
              onClick={() => exportToExcel(tableRef)}
              className="rounded-3 px-2 bg-success border-0 f20 text-center"
            >
              <RiFileExcel2Fill color="#fff" />
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
                    <th></th>
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
                          <td>
                            <Checkbox
                              value={selectedRows.includes(content._id)}
                              handleChange={() => handleRowSelect(content._id)}
                            />
                          </td>
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
        <div className="col-12 d-flex justify-content-center">
          <Socials />
        </div>
      </div>
    </Layout>
  );
};

export default Logistics;
