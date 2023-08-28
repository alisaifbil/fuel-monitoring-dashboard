import { connectToDB } from "@/utils/database";
import VehicleFuelDetails from "@/models/vehiclefueldetails";

//GET
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const vehicleDetails = await VehicleFuelDetails.find({vehicleName: params.vehicleName}).populate('creator');
        
        if(!vehicleDetails) return new Response("Vehicle details not found", {status: 404});
        return new Response(JSON.stringify(vehicleDetails), {status: 200});
    } catch (error) {
        return new Response("Failed to fetch any vehicle detail", {status: 500});
    }
}   