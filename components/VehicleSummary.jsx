import React from "react";

const VehicleSummary = ({carName, totalPrice, totalLitres, previousMonthDetails}) => {
    const momPct = Math.round(((totalLitres/previousMonthDetails.totalVolume)*100 + Number.EPSILON) * 100) / 100;
  return (
    <div className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">
        {carName}
      </h3>
      <p className="font-normal text-sm text-gray-700"> Rs. {Math.round((totalPrice + Number.EPSILON) * 100) / 100}</p>
      <p className="font-normal text-sm text-gray-700"> {Math.round((totalLitres + Number.EPSILON) * 100) / 100} Litres</p>
      <div className="w-full bg-gray-200 rounded-full mb-4 mt-4">
        <div
          className={`text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full ${momPct > 100 ? 'w-[100%] bg-red-700': momPct > 80 ? `w-[${momPct}%] bg-orange-400` : `w-[${momPct}%] bg-blue-600`}`}
        >{momPct}% of last month</div>
      </div>
    </div>
  );
};

export default VehicleSummary;
