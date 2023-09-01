import React from "react";

const FormInput = ({ type, id, step, value, onChange, required }) => {
  const hasError =
    required &&
    ((type === "text" && value.trim() === "") ||
      (type === "number" && value === 0));

  return (
    <div>
      <input
        type={type}
        step={step}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        onChange={(event) => onChange(event)}
      />
      {hasError && (
        <div className="text-xs">
          <span>This field is required. </span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
