// ServiceTypes.js
import React from "react";

const ServiceTypes = ({ types }) => {
  const typees = types[0];
  return (
    <div className="flex flex-wrap gap-4 py-4">
      {typees.map((type, index) => (
        <button
          key={index}
          className="px-4 py-2 rounded-full border border-gray-700 text-gray-700 
          hover:bg-blue-500 hover:text-white transition"
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};

export default ServiceTypes;
