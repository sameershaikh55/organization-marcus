import React, { useState } from "react";
import { requestSupplies } from "../redux/action/supplies";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";

const RequestSuppliesBodyRow = ({
  tagID,
  description,
  serialNumber,
  quantity,
  prixUnit,
  purchaseDate,
  depreciatedValue,
  _id,
}) => {
  const dispatch = useDispatch();
  const [requestQuantity, setRequestQuantity] = useState("");

  const requestQ = (id, requestedQuantity, currentQuantity) => {
    if (
      Number(requestedQuantity) > 0 &&
      currentQuantity >= Number(requestedQuantity)
    ) {
      dispatch(
        requestSupplies({
          supplies: id,
          requestedQuantity,
        })
      );
      setRequestQuantity("");
    } else {
      alert.error("Please Enter valid Quantity");
    }
  };

  return (
    <tr key={_id}>
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
        {(quantity > 0 && (
          <div className="d-flex gap-2">
            <input
              className="text-center rounded-3 border-0"
              style={{ width: "40px", fontSize: "18px" }}
              type="number"
              placeholder="Q"
              value={requestQuantity}
              onChange={(e) => setRequestQuantity(e.target.value)}
            />
            <button
              onClick={() => requestQ(_id, requestQuantity, quantity)}
              // disabled={selected.flat().length ? false : true}
              className="rounded-3 btn btn-warning rounded-3 border-0 f14 w-100 text-center color6 fw-bold"
            >
              <IoMdAdd fontSize={25} color="#fff" />
            </button>
          </div>
        )) ||
          "-"}
      </td>
    </tr>
  );
};

export default RequestSuppliesBodyRow;
