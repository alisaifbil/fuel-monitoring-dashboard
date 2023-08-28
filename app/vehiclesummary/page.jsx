"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import VehicleSummary from "@/components/VehicleSummary";
import RecentRefills from "@/components/RecentRefills";

const SummaryForVehicle = ({ params }) => {
  const searchParams = useSearchParams();
  const carName = searchParams.get("name");
  const vehicleList = {
    YY: { name: "YBR-G" },
    PE: { name: "Peugueot" },
    WR: { name: "Wagon R" },
    HC: { name: "Honda 150" },
  };

  const [refillDetails, setRefillDetails] = useState([]);
  const [distanceTraveled, setDistance] = useState(0);
  const [totalRefillVolume, setTotalRefillVolume] = useState(0);
  const [totalRefillVolumeCurrentYear, setTotalRefillVolumeCurrentYear] =
    useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalExpenseCurrentYear, setTotalExpenseCurrentYear] = useState(0);
  const [noOfRefills, setNoOfRefills] = useState(0);
  const [noOfRefillsCurrentYear, setNoOfRefillsCurrentYear] = useState(0);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const response = await fetch(`/api/vehiclerefilldetails/${carName}`);
      const data = await response.json();
      console.log(data);
      setRefillDetails(data);
      setOverallDetails(data);
    };

    if (carName) fetchVehicleDetails();
  }, []);

  const setOverallDetails = (data) => {
    let refillVolume = 0;
    let refillVolumeCY = 0;
    let expense = 0;
    let expenseCY = 0;
    let nuOfRefills = 0;
    let nuOfRefillsCY = 0;

    const sortedData = data?.sort(
      (recent, old) => new Date(old.date) - new Date(recent.date)
    );
    setDistance(sortedData[0].currentMileage);
    sortedData.map((entry) => {
      refillVolume += entry.volume;
      expense += entry.price;
      nuOfRefills += 1;

      if (new Date(entry.date).getFullYear() === new Date().getFullYear()) {
        refillVolumeCY += entry.volume;
        expenseCY += entry.price;
        nuOfRefillsCY += 1;
      }
    });
    setTotalRefillVolume(refillVolume);
    setTotalRefillVolumeCurrentYear(refillVolumeCY);
    setTotalExpense(expense);
    setTotalExpenseCurrentYear(expenseCY);
    setNoOfRefills(nuOfRefills);
    setNoOfRefillsCurrentYear(nuOfRefillsCY);
  };

  return (
    <div className="flex flex-col pl-2">
      <div className="w-full text-center">
        {vehicleList[carName].name}'s stats
      </div>
      <div className="flex flex-col gap-y-2 md:grid md:grid-cols-2">
        <div
          className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          //   onClick={handleVehicleDetailsClick}
        >
          {/* <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">
            {vehcileNames[carName].name}
          </h3> */}
          <p className="font-normal text-sm text-gray-700">
            {" "}
            {Math.round((distanceTraveled + Number.EPSILON) * 100) / 100} KMs
          </p>
          <hr className="my-2 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
          <p className="font-normal text-sm text-gray-700">
            {" "}
            Rs. {Math.round((totalExpense + Number.EPSILON) * 100) / 100}
            <br />
            Rs.{" "}
            {Math.round((totalExpenseCurrentYear + Number.EPSILON) * 100) /
              100}{" "}
            This Year
          </p>
          <hr className="my-2 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
          <p className="font-normal text-sm text-gray-700">
            {" "}
            {Math.round((totalRefillVolume + Number.EPSILON) * 100) / 100}{" "}
            Litres
            <br />
            {Math.round((totalRefillVolumeCurrentYear + Number.EPSILON) * 100) /
              100}{" "}
            Litres This Year
          </p>
          <hr className="my-2 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
          <p className="font-normal text-sm text-gray-700">
            {" "}
            {Math.round((noOfRefills + Number.EPSILON) * 100) / 100} Refills
            <br />
            {Math.round((noOfRefillsCurrentYear + Number.EPSILON) * 100) /
              100}{" "}
            Refills This Year
          </p>
        </div>
      </div>
      {refillDetails.length > 0 ? (
        <div className="flex flex-col md:w-[50%] w-[95%]">
          <h4 className="text-md p-4">{vehicleList[carName].name}'s Refills</h4>
          <div className=" pt-2 pb-4 md:pt-0 md:pr-1">
            <RecentRefills
              data={refillDetails}
              vehicleList={vehicleList}
              // noOfRecords={5}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SummaryForVehicle;
