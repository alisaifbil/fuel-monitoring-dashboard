"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RecentRefills from "@/components/RecentRefills";
import DetailsOverChart from "@/components/DetailsOverChart";

const SummaryForVehicle = ({ params }) => {
  const searchParams = useSearchParams();
  const carName = searchParams.get("name");

  const [refillDetails, setRefillDetails] = useState([]);
  const [distanceTraveled, setDistance] = useState(0);
  const [totalRefillVolume, setTotalRefillVolume] = useState(0);
  const [totalRefillVolumeCurrentYear, setTotalRefillVolumeCurrentYear] =
    useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalExpenseCurrentYear, setTotalExpenseCurrentYear] = useState(0);
  const [noOfRefills, setNoOfRefills] = useState(0);
  const [noOfRefillsCurrentYear, setNoOfRefillsCurrentYear] = useState(0);
  const [graphData, setGraphData] = useState({});
  const [graphOptions, setGraphOptions] = useState({});
  const [showGraph, setShowGraph] = useState(false);
  const [vehicleList, setVehicleList] = useState([]);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const response = await fetch(`/api/vehiclerefilldetails/${carName}`);
      const data = await response.json();

      setRefillDetails(data);
      setOverallDetails(data);
      setBarChartValues(data);
    };

    const populateVehicleList = async () => {
      const response = await fetch(`/api/admindetails/lovdetails`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();

      const dbVehicleList = data.find((value) => value.name === "vehicleList");

      setVehicleList(dbVehicleList);
    };

    if (carName) {
      fetchVehicleDetails();
      populateVehicleList();
    }
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

  const setBarChartValues = (vehicleData) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `${carName}'s Data`,
        },
      },
      scales: {
        volume: {
          beginAtZero: true,
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Litres",
          },
          grid: {
            display: false,
          },
        },
        expense: {
          beginAtZero: true,
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Ruppees",
          },
        },
      },
    };

    const currentDate = new Date();
    let labels = [];
    let counter = 0;
    while (counter <= currentDate.getMonth()) {
      labels.push(
        new Date(0, counter + 1, 0).toLocaleString("default", { month: "long" })
      );
      counter++;
    }

    const expenseData = labels.map(() => 0);
    const volumeData = labels.map(() => 0);

    vehicleData.map((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate.getFullYear() === currentDate.getFullYear()) {
        expenseData[entryDate.getMonth()] += entry.price;
        volumeData[entryDate.getMonth()] += entry.volume;
      }
    });

    const data = {
      labels,
      datasets: [
        {
          type: "line",
          label: "Refill Volume (Per Month)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          fill: true,
          data: volumeData,
          yAxisID: "volume",
        },
        {
          type: "bar",
          label: "Refill Price (Per Month)",
          backgroundColor: "rgb(75, 192, 192)",
          data: expenseData,
          borderColor: "white",
          borderWidth: 2,
          yAxisID: "expense",
          title: {
            display: true,
            text: "Ruppees",
          },
        },
      ],
    };

    setGraphData(data);
    setGraphOptions(options);
    setShowGraph(true);
  };

  return (
    <div className="flex flex-col pl-2">
      {vehicleList?.values.length > 0 ? (
        <div className="w-full text-center">
          {vehicleList.values.find((vehicle) => vehicle.id === carName).name}'s
          stats
        </div>
      ) : null}
      <div className="flex flex-col gap-y-2 md:flex-row md:justify-evenly">
        <div className="block max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow md:w-[40%] hover:bg-gray-100">
          <div className="flex flex-row gap-x-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z"
                clipRule="evenodd"
              />
            </svg>

            <p className="font-normal text-sm text-gray-700">
              {" "}
              {Math.round((distanceTraveled + Number.EPSILON) * 100) / 100} KMs
            </p>
          </div>
          <hr className="my-2 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
          <div className="flex flex-row gap-x-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
              <path
                fillRule="evenodd"
                d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                clipRule="evenodd"
              />
            </svg>

            <p className="font-normal text-sm text-gray-700">
              {" "}
              Rs. {Math.round((totalExpense + Number.EPSILON) * 100) / 100}
              <br />
              Rs.{" "}
              {Math.round((totalExpenseCurrentYear + Number.EPSILON) * 100) /
                100}{" "}
              This Year
            </p>
          </div>
          <hr className="my-2 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
          <div className="flex flex-row gap-x-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                clipRule="evenodd"
              />
            </svg>

            <p className="font-normal text-sm text-gray-700">
              {" "}
              {Math.round((totalRefillVolume + Number.EPSILON) * 100) /
                100}{" "}
              Litres
              <br />
              {Math.round(
                (totalRefillVolumeCurrentYear + Number.EPSILON) * 100
              ) / 100}{" "}
              Litres This Year
            </p>
          </div>
          <hr className="my-2 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
          <div className="flex flex-row gap-x-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>

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
        {showGraph ? (
          <div className="max-w-md md:w-[60%]">
            <DetailsOverChart options={graphOptions} data={graphData} />
          </div>
        ) : null}
      </div>
      {refillDetails.length > 0 && vehicleList.values.length > 0 ? (
        <div className="flex flex-col w-[95%] md:w-full md:justify-evenly">
          <h4 className="text-md p-4 text-center">
            {vehicleList.values.find((vehicle) => vehicle.id === carName).name}
            's Refills
          </h4>
          <div className=" pt-2 pb-4 md:pt-0 md:pr-1">
            <RecentRefills
              data={refillDetails}
              vehicleList={vehicleList?.values}
              showPagination={true}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SummaryForVehicle;
