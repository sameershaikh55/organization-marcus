const Checkbox = ({ value, handleChange }) => {
  return (
    // Wraps the checkbox component in a div with a custom class
    <div className="checkbox__wrapper">
      {/* Label for the checkbox */}
      <label className="checkbox">
        {/* The checkbox input */}
        <input
          type="checkbox"
          className="checkbox__input"
          // Sets the checkbox value to the `value` prop
          checked={value}
          // Calls the `handleChange` prop when the checkbox is toggled
          onChange={handleChange}
        />
        {/* The checkbox icon */}
        <span className="checkbox__check">
          <svg xmlns="http://www.w3.org/2000/svg" className="checkbox__svg">
            {/* The path for the checkmark icon */}
            <path d="M 1 7 L 4 10 L 10 2" fill="none" />
          </svg>
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
