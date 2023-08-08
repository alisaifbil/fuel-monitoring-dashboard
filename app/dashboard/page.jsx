import React from "react";
import VehicleSummary from "@/components/VehicleSummary";
import RecentRefills from "@/components/RecentRefills";
import DetailsOverChart from "@/components/DetailsOverChart";

const Dashboard = () => {
  return (
    <>
      <div className="w-full flex flex-row">
        <div className="grid grid-cols-2 gap-y-4 ml-[1.5rem] w-[65%]">
          <VehicleSummary />
          <VehicleSummary />
          <VehicleSummary />
          <VehicleSummary />
        </div>
        <div className="w-[40%] mr-[1rem] h-full">
          <RecentRefills />
        </div>
      </div>
      <div className="h-max w-[32vw]">
        <DetailsOverChart />
      </div>
    </>
  );
};

export default Dashboard;
