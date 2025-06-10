import React, { useCallback } from "react";

const Options = ({ option, onOptionSelected }) => {
  const handleOptionClick = useCallback((nextId) => {
    if (onOptionSelected) onOptionSelected(nextId);
  }, [onOptionSelected]);

  if (!option || option.length === 0) return null;

  return (
    <div className="options-container">
      {option.map((opt, index) => (
        <button
          key={index}
          className="option-button"
          onClick={() => handleOptionClick(opt.next_id)}
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
};

export default Options;
