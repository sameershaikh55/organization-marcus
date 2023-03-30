import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  createSupplies,
  clearErrors,
  updateSupplies,
} from "../redux/action/supplies";
import SmallLoader from "../components/SmallLoader";
import {
  CREATE_SUPPLIES_RESET,
  UPDATE_SUPPLIES_RESET,
} from "../redux/type/supplies";

const AddSupplies = ({
  addSupplies,
  setAddSupplies,
  editSupplies,
  setEditSupplies,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { suppliesLoading, suppliesError, success } = useSelector(
    (state) => state.supplies
  );

  const fields = [
    {
      label: "Tag ID",
      type: "text",
      name: "tagID",
    },
    {
      label: "Description",
      type: "text",
      name: "description",
    },
    {
      label: "Serial Number",
      type: "text",
      name: "serialNumber",
    },
    {
      label: "Quantity",
      type: "number",
      name: "quantity",
    },
    {
      label: "Prix Unit",
      type: "number",
      name: "prixUnit",
    },
    {
      label: "Purchase Date",
      type: "date",
      name: "purchaseDate",
    },
    {
      label: "Depreciated Value",
      type: "number",
      name: "depreciatedValue",
    },
  ];

  const [suppliesHandle, setSuppliesHandle] = useState({
    tagID: "",
    description: "",
    serialNumber: "",
    quantity: "",
    prixUnit: "",
    purchaseDate: "",
    depreciatedValue: "",
  });

  const handleChange = (e) => {
    setSuppliesHandle({ ...suppliesHandle, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (editSupplies) {
      dispatch(updateSupplies(suppliesHandle, editSupplies._id));
    } else {
      dispatch(createSupplies(suppliesHandle));
    }
  };

  useEffect(() => {
    if (suppliesError) {
      alert.error(suppliesError);
      dispatch(clearErrors());
    }

    if (success) {
      if (editSupplies) {
        alert.success("Supplies Edited!");
        dispatch({ type: UPDATE_SUPPLIES_RESET });
      } else {
        alert.success("Supplies created!");
        dispatch({ type: CREATE_SUPPLIES_RESET });
      }

      setSuppliesHandle({
        tagID: "",
        description: "",
        serialNumber: "",
        quantity: "",
        prixUnit: "",
        purchaseDate: "",
        depreciatedValue: "",
      });
      setAddSupplies(false);
      setEditSupplies(false);
    }

    if (editSupplies) {
      setSuppliesHandle(editSupplies);
    }
  }, [dispatch, alert, success, suppliesError, editSupplies]);

  return (
    <div
      style={{ transform: (addSupplies && "scale(1)") || "scale(0)" }}
      className="register_container"
    >
      <div className="inner_register_container">
        <button
          onClick={() => {
            setAddSupplies(false);
            setEditSupplies(false);
          }}
          className="cross bg-transparent border-0 p-0"
        >
          <FaRegTimesCircle />
        </button>

        <h2 className="text-center color2">
          {(editSupplies && "Edit") || "Create"} a Supplies
        </h2>

        <form onSubmit={submit} className="form_container pt-3">
          <div className="container-fluid">
            <div className="row gy-4">
              {fields.map((content, idx) => {
                const { label, name, type } = content;

                return (
                  <div key={idx} className="col-12">
                    <Input
                      type={type}
                      label={label}
                      name={name}
                      value={suppliesHandle[name]}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                );
              })}

              <div className="col-12">
                <button
                  disabled={(suppliesLoading && true) || false}
                  type="submit"
                  className="rounded-3 btn-lg bg_color2 rounded-3 border-0 f18 w-100 text-center color1 py-2 fw-bold"
                >
                  {(suppliesLoading && <SmallLoader />) || "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplies;
