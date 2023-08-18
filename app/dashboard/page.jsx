"use client";

import React, { useEffect, useState } from "react";
import VehicleSummary from "@/components/VehicleSummary";
import RecentRefills from "@/components/RecentRefills";
import DetailsOverChart from "@/components/DetailsOverChart";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [refillDetails, setRefillDetails] = useState([]);

  const { data : session } = useSession();
  
  useEffect(() => {
    const fetchRefillDetails = async () => {
      const response = await fetch(`/api/vehiclerefilldetails`, { next: { revalidate: 3600 } });
      const data = await response.json();
      
      setRefillDetails(data);
    };

    if (session?.user.id) fetchRefillDetails();
    
  }, []);

  return (
    <>
      <div className="w-full flex flex-col pt-4 md:flex-row pl-[2.5%]">
        <div className="w-auto flex flex-col gap-y-2 md:grid md:grid-cols-2 md:gap-y-4 md:gap-x-2 md:w-[65%]">
          <VehicleSummary />
          <VehicleSummary />
          <VehicleSummary />
          <VehicleSummary />
        </div>
        <div className="w-[92.5%] pt-2 pb-4 md:w-[40%] md:pt-0 md:pl-1 md:pr-1">
          <RecentRefills />
        </div>
      </div>
      <div className="hidden md:block md:grow md:w-full">
        <DetailsOverChart />
      </div>
    </>
  );
};

export default Dashboard;
