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

  useEffect(() => {
    const fetchRefillDetails = async () => {
      const response = await fetch(`/api/vehiclerefilldetails`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();

      setRefillDetails(data);
      setMonthlyDetails(data);
    };

    if (session?.user.id) {
      fetchRefillDetails();
    }
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
        <div className="w-auto flex flex-col gap-y-2 md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-2 md:w-[65%]">
          {monthlyRefillDetails?.currentMonth?.map((entry, index) => (
            <VehicleSummary
              key={index}
              carName={entry.vehicleName}
              totalPrice={entry.totalPrice}
              totalLitres={entry.totalVolume}
              previousMonthDetails={monthlyRefillDetails?.previousMonth?.find(
                (rec) => rec.vehicleName === entry.vehicleName
              )}
            />
          ))}
        </div>
        <div className="w-[92.5%] pt-2 pb-4 md:w-[40%] md:pt-0 md:pl-1 md:pr-1">
          {refillDetails.length > 0 ? (
            <RecentRefills data={refillDetails} />
          ) : null}
        </div>
      </div>
      <div className="hidden md:block md:grow md:w-full">
        <DetailsOverChart />
      </div>
    </>
  );
};

export default Dashboard;
