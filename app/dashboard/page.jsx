"use client";

import React, { useEffect, useState } from "react";
import VehicleSummary from "@/components/VehicleSummary";
import RecentRefills from "@/components/RecentRefills";
import DetailsOverChart from "@/components/DetailsOverChart";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [refillDetails, setRefillDetails] = useState([]);
  const [monthlyRefillDetails, setMonthlyRefillDetails] = useState({});
  const [yearlyRefillDetails, setYearlyRefillDetails] = useState([]);

  const { data: session } = useSession();
  const vehicleList = {
    YY: { name: "YBR-G" },
    PE: { name: "Peugueot" },
    WR: { name: "Wagon R" },
    HC: { name: "Honda 150" },
  };
  useEffect(() => {
    const fetchRefillDetails = async () => {
      const response = await fetch(`/api/vehiclerefilldetails`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();

      setRefillDetails(data);
      setMonthlyDetails(data);
    };

    // if (session?.user.id) {
      fetchRefillDetails();
    // }
  }, []);

  const setMonthlyDetails = (data) => {
    const monthlyArray = { currentMonth: [], previousMonth: [] };
    const currentDate = new Date();
    data.map((entry) => {
      const entryMonth = new Date(entry.date).getMonth();

      if (entryMonth === currentDate.getMonth()) {
        const indexOfEntry = monthlyArray.currentMonth.findIndex(
          (e) => e.vehicleName === entry.vehicleName
        );

        if (indexOfEntry !== -1) {
          monthlyArray["currentMonth"][indexOfEntry].totalPrice += entry.price;
          monthlyArray["currentMonth"][indexOfEntry].totalVolume +=
            entry.volume;
        } else {
          let obj = {
            vehicleName: entry.vehicleName,
            totalPrice: entry.price,
            totalVolume: entry.volume,
          };
          monthlyArray.currentMonth.push(obj);
        }
      } else if (entryMonth === currentDate.getMonth() - 1) {
        const indexOfEntry = monthlyArray.previousMonth.findIndex(
          (e) => e.vehicleName === entry.vehicleName
        );

        if (indexOfEntry !== -1) {
          monthlyArray["previousMonth"][indexOfEntry].totalPrice += entry.price;
          monthlyArray["previousMonth"][indexOfEntry].totalVolume +=
            entry.volume;
        } else {
          let obj = {
            vehicleName: entry.vehicleName,
            totalPrice: entry.price,
            totalVolume: entry.volume,
          };
          monthlyArray.previousMonth.push(obj);
        }
      }
    });

    setMonthlyRefillDetails(monthlyArray);
  };

  return (
    <>
      <div className="w-full flex flex-col pt-4 md:flex-row pl-[2.5%]">
        {monthlyRefillDetails?.currentMonth?.length > 0 ? (
          <div className="flex flex-col md:w-[80%]">
            <h4 className="text-md p-4">Refueling Summary</h4>
            <div className="flex flex-col gap-y-2 md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-1">
              {monthlyRefillDetails?.currentMonth?.map((entry, index) => (
                <VehicleSummary
                  key={index}
                  carName={entry.vehicleName}
                  totalPrice={entry.totalPrice}
                  totalLitres={entry.totalVolume}
                  previousMonthDetails={monthlyRefillDetails?.previousMonth?.find(
                    (rec) => rec.vehicleName === entry.vehicleName
                  )}
                  vehicleList = {vehicleList}
                />
              ))}
            </div>
          </div>
        ) : null}
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
