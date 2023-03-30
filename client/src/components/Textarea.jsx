import React from "react";

const Textarea = ({ label, name, value, onChange }) => {
  return (
    <div className="textarea_container">
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-100"
        rows="5"
      ></textarea>
    </div>
  );
};

export default Textarea;
