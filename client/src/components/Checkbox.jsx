import React, { useState } from "react";

const SelectBox = ({ title, name, options, onchange, state }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-select">
      <details open={isOpen}>
        <summary className="radios" onClick={() => setIsOpen(true)}>
          <input
            type="radio"
            title={(state === "" && title) || state}
            checked
            readOnly
          />
        </summary>
        <ul className="list-unstyled list">
          {options.map((content, idx) => {
            return (
              <li key={idx}>
                <label
                  onClick={() => {
                    onchange({
                      target: {
                        name: name,
                        value: content,
                      },
                    });
                    setIsOpen(false);
                  }}
                  htmlFor={content}
                >
                  {content}
                </label>
              </li>
            );
          })}
        </ul>
      </details>
    </div>
  );
};

export default SelectBox;
