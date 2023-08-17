import { connectToDB } from "@/utils/database";
import VehicleFuelDetails from "@/models/vehiclefueldetails";

export const POST = async (req) => {
  const {
    userId,
    vehicleName,
    price,
    volume,
    currentMileage,
    date,
    petrolStation,
  } = await req.json();

  try {
    await connectToDB();
    const newEntry = new VehicleFuelDetails({
      creator: userId,
      vehicleName,
      price,
      volume,
      currentMileage,
      date,
      petrolStation,
    });

    await newEntry.save();

    return new Response(JSON.stringify(newEntry), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new entry", { status: 500 });
  }
};
