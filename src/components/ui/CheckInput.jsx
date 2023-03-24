import React from "react";

const CheckInput = ({ label, ...attributes }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          {...attributes}
          type="checkbox"
          id={label}
          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
        />
        <label htmlFor={label} className="ml-2 block text-sm text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckInput;
