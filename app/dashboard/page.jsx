"use client";

import React, { useEffect, useState } from "react";
import VehicleSummary from "@/components/VehicleSummary";
import RecentRefills from "@/components/RecentRefills";
import DetailsOverChart from "@/components/DetailsOverChart";
import { useSession } from "next-auth/react";
import SummaryFilters from "@/components/SummaryFilters";

const Dashboard = () => {
  const [refillDetails, setRefillDetails] = useState([]);
  const [monthlyRefillDetails, setMonthlyRefillDetails] = useState({});
  const [yearlyRefillDetails, setYearlyRefillDetails] = useState([]);
  const [filter, setFilter] = useState("monthly");
  const [summaryData, setSummaryData] = useState({ current: [], previous: [] });

  const { data: session } = useSession();
  const vehicleList = {
    YY: { name: "YBR-G" },
    PE: { name: "Peugueot" },
    WR: { name: "Wagon R" },
    HC: { name: "Honda 150" },
  };
  const filters = ["monthly", "yearly"];

  useEffect(() => {
    const fetchRefillDetails = async () => {
      const response = await fetch(`/api/vehiclerefilldetails`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();

      setRefillDetails(data);
      filteredData(data, filter);
    };

    // if (session?.user.id) {
    fetchRefillDetails();
    // }
  }, []);

  const filteredData = (data, filter) => {
    const summaryArray = { current: [], previous: [] };
    const currentDate = new Date();
    data.map((entry) => {
      //   const entryMonth = new Date(entry.date).getMonth();
      const entryMOY =
        filter === "monthly"
          ? new Date(entry.date).getMonth() === currentDate.getMonth()
          : new Date(entry.date).getFullYear() === currentDate.getFullYear();
      const entryMOYPrev =
        filter === "monthly"
          ? new Date(entry.date).getMonth() === currentDate.getMonth() - 1
          : new Date(entry.date).getFullYear() ===
            currentDate.getFullYear() - 1;

      if (entryMOY) {
        const indexOfEntry = summaryArray.current.findIndex(
          (e) => e.vehicleName === entry.vehicleName
        );

        if (indexOfEntry !== -1) {
          summaryArray["current"][indexOfEntry].totalPrice += entry.price;
          summaryArray["current"][indexOfEntry].totalVolume += entry.volume;
        } else {
          let obj = {
            vehicleName: entry.vehicleName,
            totalPrice: entry.price,
            totalVolume: entry.volume,
          };
          summaryArray.current.push(obj);
        }
      } else if (entryMOYPrev) {
        const indexOfEntry = summaryArray.previous.findIndex(
          (e) => e.vehicleName === entry.vehicleName
        );

        if (indexOfEntry !== -1) {
          summaryArray["previous"][indexOfEntry].totalPrice += entry.price;
          summaryArray["previous"][indexOfEntry].totalVolume += entry.volume;
        } else {
          let obj = {
            vehicleName: entry.vehicleName,
            totalPrice: entry.price,
            totalVolume: entry.volume,
          };
          summaryArray.previous.push(obj);
        }
      }
    });

    setSummaryData(summaryArray);
  };

  const setFilteredData = (filterCaught) => {
    console.log(filterCaught);
    setFilter(filterCaught);
    filteredData(refillDetails, filterCaught);
  };

  return (
    <>
      <div className="w-full flex flex-col pt-4 md:flex-row pl-[2.5%]">
        <div className="flex flex-col md:w-[80%]">
          <h4 className="text-md p-4">Refueling Summary</h4>
          <SummaryFilters
            filters={filters}
            updateFilter={(value) => setFilteredData(value)}
            data={summaryData}
            vehicleList={vehicleList}
            activeFilter={filter}
          />
        </div>
        {refillDetails.length > 0 ? (
          <div className="flex flex-col md:w-[50%] w-[95%]">
            <h4 className="text-md p-4">Last Five Refills</h4>
            <div className=" pt-2 pb-4 md:pt-0 md:pr-1">
              {refillDetails.length > 0 ? (
                <RecentRefills data={refillDetails} vehicleList={vehicleList} />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      {/* <div className="hidden md:block md:grow md:w-full">
        <DetailsOverChart />
      </div> */}
    </>
  );
};

export default Dashboard;
