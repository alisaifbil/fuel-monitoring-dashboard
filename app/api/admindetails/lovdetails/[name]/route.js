import { connectToDB } from "@/utils/database";
import LOVs from "@/models/listOfValues";

//GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const listOfValues = await LOVs.find({ name: params.name });

    if (!listOfValues) return new Response("LOV not found", { status: 404 });
    return new Response(JSON.stringify(listOfValues), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch any LOV", { status: 500 });
  }
};

//UPSERT
export const POST = async (request, { params }) => {
  const { name, value } = await request.json();
  try {
    const existingLOVDoc = await LOVs.find({ name: params.name });
    if (existingLOVDoc.length < 1) {
      try {
        await connectToDB();
        const newLOV = new LOVs({
          name,
          value,
        });

        await newLOV.save();

        return new Response(JSON.stringify(newLOV), { status: 201 });
      } catch (error) {
        return new Response("Failed to create a new LOV", { status: 500 });
      }
    }

    let newValue = existingLOVDoc[0].values;
    newValue.push(value);

    await LOVs.findOneAndUpdate(
      { name: params.name },
      { values: newValue },
      { upsert: true }
    );
    return new Response(JSON.stringify(existingLOVDoc), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the LOV", { status: 500 });
  }
};
