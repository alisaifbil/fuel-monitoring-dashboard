import React from "react";
import VehicleSummary from "@/components/VehicleSummary";
import RecentRefills from "@/components/RecentRefills";

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
