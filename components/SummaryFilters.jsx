import React from "react";
import VehicleSummary from "./VehicleSummary";

const SummaryFilters = ({
  filters,
  updateFilter,
  data,
  vehicleList,
  activeFilter,
}) => {
  return (
    <>
      <div className="flex h-fit w-fit items-center justify-center bg-cyan-600 rounded-md mb-1 md:bg-slate-100/70">
        <div className="max-w-2xl px-[0.5rem] py-2">
          <div className="flex flex-wrap gap-x-1">
            {filters.map((filter, index) => (
              <label
                className="cursor-pointer"
                key={index}
                onClick={() => updateFilter(filter)}
              >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div
                  className={`w-[9.4rem] md:w-[20.375rem] max-w-xl rounded-md bg-white p-2 ring-2 ring-transparent transition-all hover:shadow ${
                    activeFilter === filter
                      ? "text-black ring-offset-2"
                      : "text-gray-300"
                  }`}
                >
                  <div className="items-center justify-between">
                    <p className="text-center text-sm font-semibold uppercase ">
                      {filter}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-1">
        {data?.current?.map((entry, index) => (
          <VehicleSummary
            key={index}
            carName={entry.vehicleName}
            totalPrice={entry.totalPrice}
            totalLitres={entry.totalVolume}
            previousMOYDetails={data?.previous?.find(
              (rec) => rec.vehicleName === entry.vehicleName
            )}
            vehicleList={vehicleList}
            activeFilter={activeFilter}
          />
        ))}
      </div>
    </>
  );
};

export default SummaryFilters;
