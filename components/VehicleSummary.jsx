import React from "react";
import { useRouter } from "next/navigation";

const VehicleSummary = ({
  carName,
  totalPrice,
  totalLitres,
  previousMOYDetails,
  vehicleList,
}) => {
  const router = useRouter();

  const momPct =
    Math.round(
      ((totalLitres / previousMOYDetails?.totalVolume) * 100 + Number.EPSILON) *
        100
    ) / 100;

  const vehcileNames = vehicleList;

  const handleVehicleDetailsClick = () => {
    router.push(`/vehiclesummary?name=${carName}`);
  };
  return (
    <div
      className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
      onClick={handleVehicleDetailsClick}
    >
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">
        {vehcileNames[carName].name}
      </h3>
      <p className="font-normal text-sm text-gray-700">
        {" "}
        Rs. {Math.round((totalPrice + Number.EPSILON) * 100) / 100}
      </p>
      <p className="font-normal text-sm text-gray-700">
        {" "}
        {Math.round((totalLitres + Number.EPSILON) * 100) / 100} Litres
      </p>
      {!isNaN(momPct) && momPct !== Infinity ? (
        <div className="w-[100%] bg-gray-200 rounded-full mb-4 mt-4">
          {/* String interpolation can be used with tailwind but there are certain limitations so it is better 
        to use style instead of giving styling inside className */}
          <div
            className={`text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full ${
              momPct > 100
                ? `bg-red-700`
                : momPct > 80
                ? `bg-orange-400`
                : `bg-blue-600 `
            }`}
            style={{ width: `${momPct > 100 ? "100" : momPct}%` }}
          >
            {momPct}% of last month
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default VehicleSummary;
