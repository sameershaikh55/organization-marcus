import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";

function convertDateValues(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] instanceof Object) {
        convertDateValues(obj[key]);
      } else {
        if (
          key.toLowerCase().includes("date") &&
          typeof obj[key] === "string"
        ) {
          obj[key] = new Date(obj[key]).toLocaleDateString().slice(0, 10);
        }
      }
    }
  }
  return obj;
}

const View = ({ editData, view, setView }) => {
  let editDataInstance = {
    ...editData,
  };
  delete editDataInstance.createdAt;
  delete editDataInstance._id;
  delete editDataInstance.__v;
  editDataInstance = {
    ...editDataInstance,
    status: { status: [editDataInstance.status] },
  };

  const toPascalCase = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const separatePascalCase = (str) => str.split(/(?=[A-Z])/).join(" ");

  const tableData = Object.entries(convertDateValues(editDataInstance)).map(
    ([mainKey, innerData]) => {
      const innerDataRows = Object.entries(innerData).map(([key, value]) => {
        if (mainKey !== "beneficiary") {
          return (
            <tr className="row px-4">
              <td className="col-6 text-white f14">
                {separatePascalCase(toPascalCase(key))}
              </td>
              <td className="col-6 text-white opacity-75 f14">{value}</td>
            </tr>
          );
        } else {
          return Object.entries(value).map(([bKey, bValue]) => {
            if (bKey === "_id")
              return (
                <tr>
                  <hr />
                </tr>
              );
            return (
              <tr className="row px-4">
                <td className="col-6 text-white f14">
                  {separatePascalCase(toPascalCase(bKey))}
                </td>
                <td className="col-6 text-white opacity-75 f14">{bValue}</td>
              </tr>
            );
          });
        }
      });
      return (
        <table className="table table_custom">
          <thead className="bg_color3">
            <tr>
              <th colSpan="2" className="text-white">
                {separatePascalCase(toPascalCase(mainKey))}
              </th>
            </tr>
          </thead>
          <tbody>{innerDataRows}</tbody>
        </table>
      );
    }
  );

  return (
    <div
      style={{ transform: (view && "scale(1)") || "scale(0)" }}
      className="register_container"
    >
      <div className="inner_register_container">
        <button
          onClick={() => setView(false)}
          className="cross bg-transparent border-0 p-0"
        >
          <FaRegTimesCircle />
        </button>

        {tableData}
      </div>
    </div>
  );
};

export default View;
