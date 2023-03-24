import React from "react";

const Input = ({ className, ...attributes }) => {
  return (
    <div>
      <input
        required
        {...attributes}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm ${className}`}
      />
    </div>
  );
};

export default Input;
// rounded-t-md
