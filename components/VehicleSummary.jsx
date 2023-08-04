import React from "react";

const VehicleSummary = ({carName, totalPrice, totalLitres, momPct}) => {
  return (
    <div className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        Peugueot
      </h3>
      <p className="font-normal text-sm text-gray-700"> Rs. 12000</p>
      <p className="font-normal text-sm text-gray-700"> 43 Litres</p>
      <div className="w-full bg-gray-200 rounded-full mb-4 mt-4">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[90%]"
        >90% of last month</div>
      </div>
    </div>
  );
};

export default VehicleSummary;
