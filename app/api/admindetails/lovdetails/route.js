import { connectToDB } from "@/utils/database";
import LOVs from "@/models/listOfValues";

//GET
export const GET = async (request) => {
  try {
    await connectToDB();
    const listOfValues = await LOVs.find();

    if (!listOfValues) return new Response("LOVs not found", { status: 404 });
    return new Response(JSON.stringify(listOfValues), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch any LOV", { status: 500 });
  }
};
