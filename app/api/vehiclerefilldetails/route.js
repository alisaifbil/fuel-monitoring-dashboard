import { connectToDB } from "@/utils/database";
import VehicleFuelDetails from "@/models/vehiclefueldetails";

export const GET = async (request) => {
  try {
    await connectToDB();

    const refillDetails = await VehicleFuelDetails.find({}).populate("creator");
    
    return new Response(JSON.stringify(refillDetails), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch any Refill Details", { status: 500 });
  }
};
